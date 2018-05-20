---
layout: post
title: Python Security Script Analysis
headline: Analysis of python wrapper script of popular security tools for UNIX systems. As the final assignment for a UC Berkeley student-run cybersecurity course, I am writing this blog post as an in-depth analysis of the python security script located at this link, https://github.com/PeterMosmans/security-scripts, credit to the original author.
---

**Authors: Rustie Lin & Nadir Akhtar**


As the final assignment for a UC Berkeley student-run cybersecurity course, I am writing this blog post as an in-depth analysis of the python security script located at this link, https://github.com/PeterMosmans/security-scripts, credit to the original author.

The script `analyze_hosts.py` scans one or more hosts for security misconfigurations. It mainly is a wrapper around common open-sourced security tools, focused on facilitating security tests. For convenience, I'll paste some relevant snippets of code for analysis. The full security script can be found at the repository linked above.


Also, it might be useful to install the script and fiddle around with it first. The installation and usage can be found in the `README.md` in the root directory of the repository.

```text
usage: analyze_hosts.py [-h] [--dry-run] [-i INPUTFILE] [-o OUTPUT_FILE]
                        [--compact] [--queuefile QUEUEFILE] [--resume]
                        [--debug] [-v] [--allports] [-n] [-p PORT] [--up]
                        [--udp] [--framework] [--check-redirect] [--nikto]
                        [--ssl] [--sslcert] [-t] [-w] [--proxy PROXY]
                        [--timeout TIMEOUT] [--threads THREADS]
                        [--user-agent USER_AGENT] [--password PASSWORD]
                        [--username USERNAME] [--maxtime MAXTIME]
                        [target]

analyze_hosts.py version 0.37.5 - scans one or more hosts for security misconfigurations

```

Running through its execution, it first gathers and parses the required options, arguments, and flags. Then, it sets up logging and preprocessing, and then goes on to execute the specified scripts in the options, calling external tools and scripts when necessary. Here's the main program loop:

```python
def main():
    """Main program loop."""
    banner = '{0} version {1}'.format(NAME, VERSION)
    options = parse_arguments(banner)
    setup_logging(options)
    logging.log(STATUS, '%s starting', banner)
    preflight_checks(options)
    prepare_nmap_arguments(options)
    logging.debug(options)
    if not options['resume']:
        prepare_queue(options)
    loop_hosts(options, read_targets(options['queuefile']))
    if not options['dry_run']:
        logging.log(STATUS, 'Output saved to %s', options['output_file'])
    sys.exit(0)
```


From the top, after making a banner string for logging purposes, the actual logging is first set up as a means to gather metadata that might be useful in assessing security. This is done in a method called `setup_logging`. Based on the options specified, different logging configurations will be applied prior to execution of the rest of the code. Notably, it uses the popular and very powerful python `requests` library.

```python
logging.getLogger('requests.packages.urllib3.connectionpool').setLevel(logging.ERROR)
```

Even after parsing all the arguments and options, setting up logging, it still has to make sure all the necessary tools are available to call in the script. This is done in the `preflight_checks` method. Some of the required packages are the popular security python packages: `python-nmap`, `python-wappalyzer`, and the aforementioned `requests`. The way the script handles imports is that if it detects a package is correctly installed and is accessible, then it assigns a mapping of the name of the package to True, in the `options` object.

The `preflight_checks` method also has to check if your current user is an administrator of the system, aka super user. This is necessary as some security tools and subroutines require root access to some system files. An example of such a check can be seen in the following:

```python
if options['wpscan'] and not is_admin():
    logging.error('Disabling --wpscan as this option needs root permissions')
    options['wpscan'] = False
```

And as mentioned before, if a package is not imported properly with the correct settings (called with `sudo` in this case), then the mapping `options['wpscan'] = False`

Afterwards, the nmap arguments are preprocessed. This is done in the `prepare_nmap_arguments` method. The requests of the users are translated from the arguments into the nmap specific syntax. This consists of checking through the presence of every option and appending flags as needed. Afterwards, the desired flags are joined together and stored within the `options` dictionary.

```python
def prepare_nmap_arguments(options):
    """Prepare nmap command line arguments."""
    arguments = NMAP_ARGUMENTS
    scripts = NMAP_SCRIPTS
    if is_admin():
        arguments.append('-sS')
        if options['udp']:
            arguments.append('-sU')
    elif options['no_portscan']:
        arguments.append('-sn')
    else:
        arguments.append('-sT')
    if options['allports']:
        arguments.append('-p1-65535')
    elif options['port']:
        arguments.append('-p' + options['port'])
    if options['no_portscan'] or options['up']:
        arguments.append('-Pn')
    if options['whois']:
        scripts += 'asn-query', 'fcrdns,whois-ip', 'whois-domain'
    if scripts:
        arguments.append('--script=' + ','.join(scripts))
    options['nmap_arguments'] = ' '.join(arguments)
```

This is all done in preprocessing so that we can correctly execute `Nmap` later. `Nmap`, or Network Mapper, is a free and open-source tool used for network discovery and security auditing. It's really popular, and the python library `python-nmap` that we use helps to programmatically manipulate scanned results of `nmap` to automate prot scanning tasks.

After all this preprocessing, we get into the security testing in the `loop_hosts` function.

It puts each `target` in the `target_list` into a queue which it iterates through. Targets are specified in a queuefile, and represent the hosts we want to analyze. It then generates threads for as many threads as specified by the user, iterating through the process hosts. It then appends a different target to each thread, iterating until no more targets remain. A daemon is executed on the last member of the `threads` array, and logging follows when the threads start. This is all dumped into a work queue, and when the queue is empty, this means that all threads have been correctly started. At which point, we then wait for all the threads and their corresponding processes and security checks to finish.After doing more final checks to ensure no interruption, the program enters a while loop, continuing until the queue is empty and logging every second, and as before this continues until all threads stop.

On execution, threads can call any number of subroutines, so long as they are properly defined in the options preprocessing. We'll now analyze some of the subroutines that are defined in this python script. `analyze_url` simply analyzes a URL using `wappalyzer` and executes corresponding scans. It does an HTTP GET, using again another wrapper around the python `requests` library (using the `requests_get` wrapper method also defined in the script) and based on the responses, either stops (no response), does scans on HTTP response code 200 (success), or logs any other unpredicted response.

Droopescans can be done using the `do_droopescan` method. Droopescan is a particularly helpful tool in identifying issues with popular CMS programs, such as Drupal, Wordpress, Joomla, etc. We can see this in the method code:


```python
def analyze_url(url, options, logfile):
    """Analyze a URL using wappalyzer and execute corresponding scans."""
    wappalyzer = Wappalyzer.Wappalyzer.latest()
    page = requests_get(url, options)
    if not page:
        return
    if page.status_code == 200:
        webpage = Wappalyzer.WebPage(url, page.text, page.headers)
        analysis = wappalyzer.analyze(webpage)
        # Format logmessage as info message, so that it ends up in logfile
        logging.log(LOGS, '[*] %s Analysis: %s', url, analysis)
        if 'Drupal' in analysis:
            do_droopescan(url, 'drupal', options, logfile)
        if 'Joomla' in analysis:
            do_droopescan(url, 'joomla', options, logfile)
        if 'WordPress' in analysis:
            do_wpscan(url, options, logfile)
    else:
        logging.debug('%s Got result %s - cannot analyze that', url,
```

On the other hand, the purpose of `execute_command` is to interpret and execute some command, its flags, and optionally appending to a specified logfile. It returns the resulting value of computation (Success or Failure), along with any `stdout` or `stderr` information. It leverages the existing `subprocess` module, which interprets the commands and returns a process. (The `stdout` and `stderr` are also retrievable from this, though as bytestrings. These are converted immediately after.) In the event of an OS or Execution error, these errors are logged to the the logfile. This method is at its core a wrapper for the `subprocess.Popen` method.

Also notable is the definition of popular ports at the beginning of the file, as their proper configuration is of utmost importance in correct execution. These are well known port numbers, and are specified here:

```python
ALLPORTS = [(22, 'ssh'), (25, 'smtp'), (80, 'http'), (443, 'https'),
            (465, 'smtps'), (993, 'imaps'), (995, 'pop3s'),
            (8080, 'http-proxy')]
SSL_PORTS = [25, 443, 465, 993, 995]
```


In summary, this post demonstrates the simplicity, modularity, and legibility of wrapper functions, along with their ability to speed up workflow by several orders simply with a few lines of code. With this wrapper acting as an intermediary between the user and several different types of tools, the user no longer needs to understand each tool individually.

Instead, by understanding the wrapper and its API, they have access to all desired functionality under the hood with ease. In addition, this python file makes it easier to communicate with peers, as there is a common language with which to discuss and debug any possible errors or issues. Lastly, by creating a utility like this, it allows less experienced developers or security engineers to get their hands on these more complicated tools by lowering the learning curve, as Java did for enterprise developers by abstracting away several machine-specific concepts necessary in C. By doing so, one has the option to quickly prototype and build with the abstractions provided by this software and dig deeper into the underlying tools later as they so choose, especially if they want to get into the nitty gritty to better understand how to make their code both more powerful and more efficient.
