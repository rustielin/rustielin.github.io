---
layout: page
title: Projects
---

<p class="message">
  Here's a list of personal and hackathon projects that I've undertaken in no particular order. Most can be found on
  my GitHub profile <a href="https://github.com/rustielin">here</a>.
  
</p>

### Manouse (PC)
* Submission for Cal Hacks 4.0
* PC application that uses computer vision technology to map hand gestures to mouse control
* Used OpenCV computer vision library to create an outline of the hand, find its position, and count the number of fingers 
* Hand position and number of fingers can be mapped to various actions such as mouse position and left and right clicking
* We also built a simple rock, paper, scissors game to demo our app
* Built with **Python**, **OpenCV**, and **win32api**

### Tutor Chat (Web)
* Submission for HackUCI 2017
* Web app that lets busy students collaborate, ask questions, and watch live-streamed lecture remotely in real time
* Uses a queue system to pair students with available course staff
* Public and private chats are conducted through Firebase
* Built with **HTML**, **CSS**, **AngularJS**, and **Firebase** 

### Hello from the Outside (Android)
* Submission for Outside Hacks IV
* Android app that helps concert goers (Outside Lands 2016) coordinate meeting times and locations with their friends
* Uses vibration to tell the user the approximate distance they are from a friend
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

