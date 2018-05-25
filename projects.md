---
layout: page
title: Projects
---

<p class="message">
  Here's a list of personal and hackathon projects that I've undertaken in no particular order. Most can be found on
  my GitHub profile <a href="https://github.com/rustielin">here</a>.

</p>

### Atom Image Paste
* [Atom Image Paste on the Atom package browser](https://atom.io/packages/atom-image-paste)
* Creates PNG in specified directory from image in clipboard
* Mini project to improve my productivity on other projects
* Other similar plugins didn't work for me or have the functionality I want
* **CoffeeScript**, **JavaScript**, and **Atom** dev kit

### Berkeley Mobile (Android, iOS)
* Official UC Berkeley mobile app, [Android](https://play.google.com/store/apps/details?id=com.asuc.asucmobile&hl=en) and [iOS](https://itunes.apple.com/us/app/berkeley-mobile/id912243518?mt=8)
* Leading Android team sprints in fast-paced and highly collaborative Agile environment
* 12,000 downloads and 5,000 unique monthly users
* Implemented material design splash screen with custom RecyclerView adapters and controllers for updating dining hall and cafe hours, menus, user preferences, and nutritions
* Leveraging tools such as okhttp, gson, and Retrofit for interfacing with our RESTful backend
* Network response caching for optimal user experience
* Modularized and refactored data adapters and controllers on existing codebase, minimizing redundant code and speeding up development time by 2x

### Manouse (PC)
* Submission for Cal Hacks 4.0
* PC application that uses computer vision technology to map hand gestures to mouse control
* Used OpenCV computer vision library to create an outline of the hand, find its position, and count the number of fingers
* Hand position and number of fingers can be mapped to various actions such as mouse position and left and right clicking
* We also built a simple rock, paper, scissors game to demo our app
* Devpost link [here](https://devpost.com/software/manouse-webcam-mouse)
* Built with **Python**, **OpenCV**, and **win32api**

### 2Burgers (Android, Django Server)
* Submission for Hack Into It 2017
* Android application that tracks daily, weekly, and lifetime purchases
* Designed to provide insight on opportunity cost: a list of practical items that sum to the same total as what the user bought
* Aggregate user statistics and user personalization data handled with Firebase
* Datasets from data.world
* Django RESTful server that runs K sum problem on user query
* Built with **Django**, **Firebase**, **Android**

### Tutor Chat (Web)
* Submission for HackUCI 2017
* Web app that lets busy students collaborate, ask questions, and watch live-streamed lecture remotely in real time
* Uses a queue system to pair students with available course staff
* Public and private chats are conducted through Firebase
* Devpost link [here](https://devpost.com/software/tutor-chat)
* Built with **HTML**, **CSS**, **AngularJS**, and **Firebase**

### Hello from the Outside (Android)
* Submission for Outside Hacks IV
* Android app that helps concert goers (Outside Lands 2016) coordinate meeting times and locations with their friends
* Uses vibration to tell the user the approximate distance they are from a friend
* Hackathon was hosted at Weebly headquarters... so check out our Weebly website [here](http://hello-fromtheoutside.weebly.com/)
* Built with **Android**, **Java**, **XML**, **Firebase**, **Google Maps**, and various Android motion and vibration controls

### Slit (PC, MacOS, Android, iOS)
* Personal project currently undergoing development. Hoping to have this on the Google Play Store eventually
* Cross-platform 2D game inspired by the interaction of waves and the famous double slit experiment
* Uses Tiled map editor to make portable maps
* Filter bits to manage contact and collisions in engine
* Uses a custom touchpad controller for mobile devices, and remappable keys for PC
* Built with **Java**, **LibGDX**, **Scene2D** physics engine, and **Box2DLLight** lighting system

### BearMaps (Java Server)
* One of several projects for the CS61B Data Structures course at UC Berkeley
* Server that hosts functionality via RESTful API for a provided front-end web client
* Map image rastering on multiple zoom levels using a quadtree implementation for N, S, E, W directions
* Efficient parsing and analysis of OpenStreetMap data in OSM XML format
* Routing between two locations on the map by constructing graphs with parsed OpenStreetMap data and using the A* shortest path algorithm
* Built with **Java (Spark)** and data from **OpenStreetMap**

### Blockchain and Cryptocurrencies Textbook
* A meticulous set of open source notes covering various high-demand topics in the blockchain and cryptocurrency space, including Bitcoin, Ethereum, the Lightning Network, and the InterPlanetary File System
* Offers a high level overview and also technical details of Bitcoin, consensus algorithms, and cryptography fundamentals
* Based on Blockchain at Berkeley's Spring 2017 "Introduction to Cryptocurrencies and Blockchain" course
* GitHub link [here](https://github.com/rustielin/Blockchain-Notes), or check our the related blog post [here]({% post_url 2017-6-27-blockchain_textbook %})
* Written using **LaTeX** typsesetting system

### Velocity (Android)
* Submission for Los Altos Hacks 2016
* Simple and elegant to-do list as Android lock screen replacement
* Features randomized wallpapers and inspirational quotes
* Based on the Momentum Google Chrome extension (Momentum / mass of a PC = Velocity haha...)
* First time writing an Android application
* Built with **Android**, **Java**, **XML**

### Music Maker (Web)
* Sumission for Hack Jam Fall 2016
* Reads .WAV music files and interpolates the root chords of the song
* Did not have enough time to implement beat analysis, but instead sampled the sound in set time intervals
* First time writing a web app using Django
* Built with **Django**, **Python**, **HTML**

### Team Manager (Android, iOS)
* A simple demo for React, React Native, and React Redux
* Mobile application that keeps track of team members and their contact information
* Members can either be admins (who can remove other members), or regular memers (who can't remove others)
* Features List, Add, and Edit Team Member screens, which talk to each other via reducers to alter the app's local state
* First time writing a mobile app using React Native and React Redux
* Built with **JavaScript**, **ReactJS**, **React Native**, **React Redux**

### Firebase People Demo (Android)
* A simple demo for Firebase and Firebase UI in Android
* Android app that keeps track of a list of people, synchronized with a Firebase back-end
* First time using Firebase UI, namely RecyclerViews, in conjunction with other aspects of the material design scheme
* Built with **Android**, **Java**, **XML**, **Firebase**

### Hack Jam Linux (Linux)
* Submission for Hack Jam Fall 2015
* An extremely lightweight yet friendly custom Linux distribution (based on Arch) intended to breathe new life into old, slow, refurbished computers
* Installed a friendly Windows-like desktop environment (LXDE), and also web, educational, image editing software, etc
* Built with completely open source software, and with full access to the Arch User Repository
* Runs smoothly in a virtual machine with only 64 MB RAM
* Built with **Arch Linux**, **Architect**, **Arch User Repository**, and various command line tweaks

### Meme Vision (Android)
* High School computer science class project
* A simple Android app that draws memes over detected faces through both rear and front-facing cameras
* First time using OpenCV for Android
* Built with **Android**, **Java**, **XML**, **OpenCV**

### Bear Hacks CVision (PC)
* Winner of HKN Bear Hacks Spring 2016
* First time using OpenCV, written following a workshop and presentation on computer vision research at UC Berkeley
* A simple Python script using OpenCV that swaps detected faces
* Also optionally draws the Cal Hacks mascot DDoSki over detected faces
* Built with **Python**, **OpenCV**

### Center for Empowering Refugees and Immigrants
* Submission for Berkeley Builds 2017 Designathon, in collaboration with the Center for Empowering Refugees and Immigrants
* Creative and intuitive dual screen website that aims to bridge the cultural gap between grandparents and their grandchildren as they use the
website together
* Asks carefully worded questions to both the grandparent and grandchild to encourage meaningful conversation
* Grandparent and grandchild create profiles (Name, date and place of birth, etc.) at the start, and the linearly designed
website progresses like a storybook
* Interactive map screen traces the distance traveled by their families
* Built with **AngularJS**, **AngularJS Material**, **HTML**, **CSS**

### Smartphone Mouse
* Ongoing personal project
* Use your smartphone as you would a regular mouse (place phone on a cloth, and slide it on a table if phone case is
not already slidey)
* Features Android app with on screen buttons for left, right, and middle click, and an area for scroll
* Android app client, and Python server which runs calculations on phone acceleration data and has mouse control in the local device
* Sends a custom byte stream via TCP with Android accelerometer data, as well as bits for mouse click and scroll
* Currently designing an algorithm to translate linear accelerometer data to smooth mouse movements (accelerometer drift makes
mouse movement jittery at times)
* Building with **Android**, **Java**, **XML**, **Python**, **Python**, **win32api**
