# How to Build This App (Conference Track Managementr)

**Build this App on your own by follow the following steps:**

<br>

**1. Analyze the problem and find the children and parent objects:**

- After reading the problem you understand there's 3 main objects: Conference, Tracks and Talks.
    - You understand that the Conference object can hold multiple Tracks(array) and that a Track can hold multiple talks(arrays) on it's morning and evening sessions. 
    - The order of parent to child looks like this: Conference-> Track -> Talk.

<br>

**2. Understand what information each object (Conference, Track, Talk) will hold inside itself:**

- Grab a pen and paper and break down the problem into smaller pieces.

**Conference**
    
- You understand that a Conference hold an array of Tracks.
- You understand that a Conference holds it's own morning/afternoon start times (9AM/1PM) and finishBy times (12AM/5PM).
-  You also understand that a Conference holds a trackCounter that keep track of the Track Number.

**Track**
  - You understand that a Track holds it's own Track number.
  - You understand that a Track holds fixed  startTimes and finishTalksBy (for their morning and afternoon sessions)  and that each "slot", morning and afternoon, has X amount of minutes available, which is equal to the difference between 'endSlotTalksByY' and  'slotStartingTime' in minutes ( endSlotTalksByY - slotStartingTime).
- You understand a Track holds the start time of the lunch (which we need from the beggining) and the start time of the networking event, which we need to find out.

**Talk**
  - You understand that a Talk object holds the title of the talk, the duration of the talk, the start time of the talk and whether it is a lighting talk (5 minutes) or not.
  - You understand that a Talk object will also have to hold a 'hasSpot' boolean to know if it has been placed inside a Track or not.

<br>

**3. Methods**

After creating the objects you need to slowly start building Methods to get the information you need to push the project forward. If you need some information, say 'Information X', think about what inputs you will need to get the output 'Information X' you need. If you don't have those inputs, find out what information you need to get them and so on.

**Here is a list of Methods I have for each Object:**

- Conference:
    - createNewTrack( );
    - buildTrackList(arrayOfTalks: Talk[ ]);
    - placeNetworkingEvents( );
    - placeTalks( );
- Track
    - findNetworkingEventStartTime( );
- Talk
    - talkAssignedToTrack( );
    - placeTalk(track: Track);
    - calculateTalkStartTime(track: Track, session: Session);

<br>

You don't have to have to have the exact same methods, but this should give you an idea of what inputs and outputs you will need to build your application. 

if you choose to work with Date objects, which I did, make sure you use a library for that. I used date-fns for this project.

<br>

**4. Test Driven Development**

I highly recommmend you use Jest or some other test driven development tool. It will save you time in the long run. All you have to do is: write Methods, write unit tests for those Methods, and look at the screen. If it turns red, look at the Method throwing the error and fix it. Do this over and over until you have all the Methods you need and start doing integration testing.

<br>

**5. Front End of the Application**

There's not much I can say about building the front-end. It's up to you what technology you will be using to build the front end.

For the same reason I didn't recommend a programming language to build your back end logic, I can't recommend a programming language for building the front-end.

At the end of the day it's personal choice, just choose something you are confortable with. Programming it's just 0's and 1's and as long as your logic is correct, your application will work out as expected.

<br>

**6. Persistence**

Remember to never panic. When you have one of those days where you seem to hit a wall in your development journey, just take a step back and relax for a little. You've handled worst before, be confident on your abilities and trust the process. One step at a time. Go back to the pen and paper if necessary and break things down into smaller steps. That will help you break through more often than not.

<br>


*- Xavier Marques*



