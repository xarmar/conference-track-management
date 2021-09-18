# Thought Process

## **13/09/2021 - Day 1**

I chose to go with Problem 2 (CONFERENCE TRACK MANAGEMENT) as it seems to be a fun project and something I would enjoy doing.

After reading the instructions **I realise I need to break down the project into small steps.** 

The first obvious step is to **break down the instructions into pseudo-code.** 

Coding without knowing where I am going is surely a place I don't want to be in. My logic doesn't have to be flawless, I most likely have to fix things along the way and that's fine. 

So here's my breakdown of the instructions:


**"The conference has multiple tracks each of which has a morning and afternoon session."**
- As the user inputs the talks, my app needs to determine if they fit in the existing track/day. If not, another 'track/day' needs to be created.

        if (talks fit in existing track) {
            // add talk to track
        }
        else {
            // create another track and add the talk
        }
<br>

**"Each session contains multiple talks."**
- Morning Session: X amount of talks (depending on length).
- Afternoon Session: Y amount of talks (depending on length).

<br>

**"Morning sessions begin at 9am and must finish by 12 noon, for lunch."**

- Maximum Morning Hours Available for Sessions = 3 hours = 180 minutes

        let morningAvailableMinutes = 180
        let afternoonAvailableMinutes = 180
        let arrayOfTalksToBeInserted = [...]

        // Loop over array and check conditions
        if (talkToBeInserted.duration < morningAvailableMinutes) {
            // add talkToBeInserted to Morning session
            morningAvailableMinutes -= talkToBeInserted.duration
        }

        // If there's no space in the morning session
        else if (talkToBeInserted.duration < AfternoonAvailableMinutes) {
            // add talkToBeInserted to Afternoon session
            afternoonAvailableMinutes -= talkToBeInserted.duration
        }

        // If there's no available space in the track
        else {
            // create a new track, move all remaining talks to new Track and repeat the process.
        }
       

**"Lunch always takes 1 hour"**

- Lunch hour is always from 12am to 1pm. It takes the whole hour.

**"Afternoon sessions begin at 1pm and must finish in time for the networking event. The networking event can start no earlier than 4:00 and no later than 5:00."**

- Afternoon sessions always begin at 1pm.
- Afternoon sessions must finish before the networking event which starts between 4pm and 5pm.
- Maximum Afternoon Hours Available for Sessions = 4 hours = 240 minutes.

        (...)

        // If there's no space in the morning session
        else if (talkToBeInserted.duration < AfternoonAvailableMinutes) {
            // add talkToBeInserted to Afternoon session
            afternoonAvailableMinutes -=;

        // If there's no available space in the track
        else {
            // create a new track, move all remaining talks to new Track and repeat the process.
        }


**"No talk title has numbers in it."**

    if(talkTitleInput.containsNumber) {
        // reject input and warn user by displaying a message and coloring the input field
    }

**All talk lengths are either in minutes (not hours) or lightning (5 minutes).**
- Accept inputs between 5 minutes and 60 minutes
- Accept the word 'lightning' which === 5 minutes

        // If input is a number
        if (!isNaN(minutesInput)) {
            if(minutesInput >= 5 && <= 60) {
                // accept input
            }
            else {
                // reject & warn user no one can listen to a talk for more than 1 hour
            }
        }

        // If input isNaN
        else {

            // check if it's lightning
            if (minutesInput.toLowerCase() === 'lightning') {
                // accept and equal value to 5 minutes
            }
            else {
                // it's invalid, reject & warn user by displaying a message and coloring the input field
            }
        } 

<br>

**Presenters will be very punctual; there needs to be no gap between sessions.**
- Just stack talks one after another.

<br>

### **DEVELOPMENT GAMEPLAN:**

I don't want to overcomplicate things. **I will start with the logic first.** After the logic is working, I build the front-end:

- Inputs are given in PDF, along with the expected outputs. Take advantage of this by using use Jest and having a **test driven development mentality**.

- Developing the front-end is secondary. It will be something simple. A single-page React application which will help me get more confortable with functional components and challenge myself to use Hooks.

- I will be using **Gitflow as my git approach**.

<br>

## **14/09/2021 - Day 2**
I don't have as much time as I'd like during the week, but that is no excuse.

Yesterday I was able to create the basic class Components for 'Conference', 'Track' and 'Talk'. These classes are still missing their methods and I will address that at a later date. Right now my focus is on getting all the current unit tests to pass.

I won't touch the front-end until a later. All the logic needs to be flawless first, otherwise I will be wasting time on UI and the back end logic will fail.

**Conference**

It's obvious that there will be a unique 'Conference' that will hold multiple 'Tracks' and each track will hold in their morning or afternoon sessions some talks.

To do this, the 'Conference' parent will have a counter and it will increment whenever a new 'Track' is created, passing that number to the 'Track'. 

The 'Conference' Component will have to run a loop that creates new 'Tracks' when talks don't fit in the current track.

**Track**

Each track will keep track of their morning and afternoon sessions and how many minutes they have remaining to fit Talks. If a talk doesn't fit, a method will be called to create a new Track. Then the loop starts all over again, but this time, the Talks will check for slots in the newly created Track too.

Tracks also need to somehow keep track of the start hour of each talk. This is the part that I will have to think about better. Right now, I'm thinking I can do something like:

        let trackOne = new Track(arguments);
        let trackTwo = new Track(arguments);
        
        // Using 3 examples of Talks
        Talk A 60min
        Talk B 60min
        Talk C: 45min
        
        // These hours come directly from the 'Conference' Component and will be incremented in each Track Object as Talks are added
        let morningStartHour = new Date();
        morningStartHour.setHours(9, 0, 0);

        let afternoonStartHour = new Date();
        afternoonStartHour.setHours(13, 0, 0);

        // Loop over Talks

        //If Talk doesn't have a spot in a track yet
        if (!currentTalk.hasSpot) {
            // Loop Over Tracks

            // Check if it fits inside the Track's morning
            if (currentTalk.duration < currentTrack.sessions.morning.availableMinutes) {
                currentTalk.startTime = morningStartHour;
                morningStartHour.setMinutes(currentTalk.duration);
                // add talk to currentTrack.sessions.morning.talks[]
                talk.hasSpot = true
            }
            else if (currentTalk.duration < currentTrack.sessions.afternoon.availableMinutes) {
                currentTalk.startTime = afternoonStartHour;
                afternoonStartHour.setMinutes(currentTalk.duration);
                // add talk to currentTrack.sessions.afternoon.currentTalks[];
                currentTalk.hasSpot = true
            }

            else {
                // create another Track and call function to loop over Talks again to check for spots. To this until all Talks have hasSpot = true
            }
        }

After writing the code above I realized that the 'Talks' Component will have to have a 'hasSpot' and 'startTime' attribute and the 'Track' Component will have to have a attribute that keeps track of morning and afternoon start times.


**Afternoon Update**

Ok so I've just added the missing attributes to my Classes. I might need to add some more after, but I'm happy that I catched this early on by thinking and going over the project this morning.

- So now I checked that the Components are being created as expected when we used the Object Constructor method, that's good.
- Right now I need to keep working on my integration testing, before I even start adding methods to my Components. I need to make sure everything is working as expected.

<br>

**Evening Update**

Ok, so I've just uploaded the main logic for the App. I added the methods: buildTrackList, placeTalks and createNewTrack to the 'parent' Class Conference. 

Now I need to start using Jest to validade my code. I hope things keep going like this as I am aiming to finish the project in 10 days. I estimated 6 days (12 hours total) for building the logic and 4 days (8 hours total) for building the front-end.

Because I have 14 days total to finish the project, I want to leave an extra 4 days just in case something goes wrong or if I want to get fancy and start a new branch to work on some new features.

*Warning*

Just noticed that when using the normal Javascript date(), there is an offset of hours. This can compromise the project as the numbers displayed will be different. Must find solution, either in VanillaJS or by using an external Js Library.

## **15/09/2021 - Day 3**

**Morning**

 So I was just thinking how I would get the 'Networking Event' afternoon hours to display correctly and I came up with the following logic:

        // After all talks have been assigned to tracks

        hourToStartNetworkingEvent = undefined;

        // Loop over tracks and check
        if(currentTrack.sessions.afternoon.availableMinutes >= 60) {
            // Place Networking Event at 4pm.
            hourToStartNetworkingEvent = 4pm
        }
        else {
            //Find out how many minutes to add to 4pm
            let minutesToAdd = 60 - currentTrack.sessions.afternoon.availableMinutes

            // Add minutes to 4pm
            hourToStartNetworkingEvent = 4pm + minutesToAdd
        }

        <!-- EXAMPLE -->
        currentTrack.sessions.afternoon.availableMinutes = 45;
        
        // Else runs (45 < 60)
        let minutesToAdd = 60 - 45 = 15;
        hourToStartNetworkingEvent = 4pm + 15 minutes = 4:15PM

I will apply this later, now I need to research how to fix the problem with the date giving an offset in hours. 

I also need to create more Methods and break down the logic in Conference 'placeTalks()' method. Instead of having a big method, I can break it down by doing something like this:

        // Talk.ts file
        // Create a method for Talk class that mirrors the part of the logic in placeTalks().

        placeTalk(track) {
            // Check if talk fits inside currentTrack's morning
            if (this.duration <= track.sessions.morning.availableMinutes) {
                this.startTime = track.morning.startTime;

                // Increment startTime for next talk that will be placed - still need to find out how to increase minutes
                track.sessions.morningstartTime.increaseMinutesBy(this.duration);

                // Subtrack from track.sessions.morning.availableMinutes
                track.sessions.morning.availableMinutes -= this.duration

                // Add talk to track morning's array
                currentTrack.sessions.morning.talks.push(this);

                // Tell App that talk is placed
                this.hasSpot = true
            }

            else if (this.duration <= track.sessions.afternoon.availableMinutes) {
                this.startTime = track.afternoon.startTime;

                // Increment startTime for next talk that will be placed - still need to find out how to increase minutes
                track.sessions.afternoonstartTime.increaseMinutesBy(this.duration);

                // Subtrack from track.sessions.afternoon.availableMinutes
                track.sessions.afternoon.availableMinutes -= this.duration

                // Add talk to track afternoon's array
                currentTrack.sessions.afternoon.talks.push(this);

                // Tell App that talk is placed
                this.hasSpot = true
            }
        }

**Evening**

Found the solution for my date operations. I will be using *date-fns* because momentJs is deprecated, it's not choice. Plus I will only use a few functions so no need to import a whole library.

I just finished replacing the old date creation functions with the new ones. Now it's time to start building my placeTalk Method in the Talk Component.

**Thoughts**

I like using Modular pattern (a self calling function containg other functions) as I like to aggregate all related functions under one main function. However, because I am using Classes, I was having some trouble with imports, so I just chose to have multiple functions inside a timeOpererations.ts file and export them normally.

The reason I'm not using date-fns directly and importing it directly into every Component is because I want to keep all my functions related to time manipulation in one file.

I keep timeOperarations.ts and timeOperarations.unit.test.ts file in the same folder and separated form the other Components for better organization. At the end of the day, these are just helper functions.

Ok, I just finished writing the unit tests for Talk.ts. 

**Evening Later**

Ok, so I've been thinking about the best way to calculate Talks's start Times and even though my code would work like it is right now: (increment Morning/Afternoon startTimes) and assigning it to Talks, I wouldn't feel good about it

I just thought about a better and more descriptive way. Incrementing morning/afternoon.startTime doesn't make much sense as the morning and afternoon starting times are always the same: 9AM and 1PM respectively. If I was building software for a client this would only confuse the client and future developers working on the project. 

So here's my alternative:
- Keep morning/afternoon startingTimes.
- Create a new property: 'finishTalksBy'

It would work like this:

            // Track Example
            trackNumber: 1,
            sessions: {
                morning: {
                    availableMinutes: 180,
                    finishTalksBy: Date // This date value will be passed with createDate(12,0,0);
                    startTime: morningStartTime,
                    talks: [],
                },
                afternoon: {
                    availableMinutes: 240,
                    finishTalksBy: Date // This date value will be passed with createDate(17,0,0);
                    startTime: afternoonStartTime,
                    talks: [],
                }
            }

            // This means I could get a Talk startTime with the folllowing calculation:

            // If talk is placed in Morning slot
            talk.startTime = track.sessions.morning.finishTalksBy - track.sessions.morning.availableMinutes

            // If talk is placed in Afternoon slot
            talk.startTime = track.sessions.afternoon.finishTalksBy - track.sessions.afternoon.availableMinutes

            //In practice, if a Track is empty, it would behave like this:
                //talk is inserted in morning slot
                talk.startTime = convertToAmPm(track.sessions.morning.finishTalksBy - track.sessions.morning.availableMinutes);
                
                // EXAMPLE 1
                talk.startTime = 12 AM - 180 minutes = 9AM

                // EXAMPLE 2
                // Track has 55 minutes left in afternoon

                talk.startTime = convertToAmPm(track.sessions.afternoon.finishTalksBy - track.sessions.afternoon.availableMinutes);

                // In pseudo-code this is translated to:
                talk.startTime = 17PM - 55 minutes = 16:05 PM

**Late Night**

Just finished creating the calculateTalkStartTime method and tested it against some Jest tests and it's working. I'm pretty sure it will works against the networking event contraint. In a couple of days I expect to have this tested in a integration test.

Project seems to be going well, Jest helps a lot. I wouldn't have progressed this fast without it. I'm happy I learned TDD a few months ago. My goal is to finish this backend logic in within 3 days, I think I'm on my way to do it. Then I will build the front-end which will be a simple App, not super fancy.

## **16/09/2021 - Day 4**

**Morning**

I just started by morning by adding tests to the placeTalk method, fixing some Jest tests. I'm happy as things seem to be working and the class methods are passing the tests. 

I think now is the time to start working on integration testing. To really start building the buildTrackList method, which is the foundation for building the list of Tracks with the assigned Talks.

**Evening** 

I had some time during my lunch break to code which I used to code the Track method findNetworkingEventStartTime(). This method returns the hour the networking event should start at. 

- This runs inside Conferences's Method placeNetworkingEvents() method which loops over a array of Tracks. This way all Tracks get the correct time to start their networking events.

<br>

**Evening Continued**

Ok, at this time I've written all the logic necessary to Build the track list. I will now confirm this by writing a unit test for the buildTrackList() and checking if it works as expected. 
- I will use the titles and minutes values provided in the PDF document and check if the output is the same.

Ok so I was writing the Talks that will be used in buildTrackList() and realized that, the word 'lightning' still needs to be handled. The easiest way in my mind will be to do the following:

        // Define new custom Type
        Type Lightning = 'lightning';

        //Make sure talks can receive a number or "lightning" for their duration
        duration: number | Lightning

        // In the constructor, have a 'isLightning' attribute that will hold a "number" or the string "lightning"
        this.duration = duration
        this.isLightning = this.duration

        // on placeTalks() Method, when looping over talks, if isNaN(this.isLighting) returns true set a talk's this.duration = 5, just to easily work with dateOperations

        if(isNaN(this.isLightning)) {
            this.duration = 5;
        }
        
        // Then, on Conference's buildTrackList() Method, after all Talks are assigned to a Track, set the value of this.duration to the original 'lightning' for the talks that return true to isNaN(this.isLightning)

        (...)
        do {
            // If every Talk is assigned to a Track, stop looping, job is done
            if(arrayOfTalks.every(talk => talk.talkAssignedToTrack())) {
                allTalksHaveASpot = true;
                // Loop over talks and set duration back to 'lightning' when appropriate
                arrayOfTalks.forEach( talk => {
                    if(isNaN(talk.isLightning)) {
                        talk.duration = "lightning";
                    }
                }
                break
            }
        }


## **17/09/2021 - Day 5**

**Morning**

The code I mention above is redundant so I will not go ahead with it. It will instead have a this.isLightning: Boolean in the Talk constructor. 

Later, in the front end I will build the logic to capture the input "lightning" as 5 minutes. Then once I am giving out the output I build the logic to

        // if (this.isLightning) {
            return "lightning"
        }
        else {
            return 5
        }

**Morning Update**

So I was having some trouble with my unit test for buildTrackList() method, it was not returning the array length I wanted. After about an hour of looking at my code I realize I had forgotten to replace the old code inside the if statetement with the method placeTalk(). Now the unit test that tests for array length is passing.

However, I still need to test for other things like startTimes of Talks and networking Event start times.

**Evening Update** 

Ok, I was trying to test for exact arrayLengths and TalkObjects inside each Track.

I realized that the algorythm built by the engineer in the PDF document has a different logic on how to place the Talk objects inside the Tracks.

My first thought was that the algorythym could be one of three options:

Example Track 1 | availableMinutes = 5 minutes

Talk X | 10 minutes duration

Talk Y | 5 minutes duration

*Algorythm 1 - This is the algorythm I wrote*
- Talk X is **not placed** in Track 1
- A new Track is Created (Track 2)
- Talk Y **is placed** in Track 2

*Algorythm 2*
- Talk X **is not placed** in Track 1    
- Talk Y **is placed** in Track 1
- A new Track is Created (Track 2) when another talk tries to mount Track 1 with 0 minutes available.

*Algorythm 3*
- Talk X **is not placed** in Track 1 
- A new Track is Created (Track 2)  
- We **immediately place** Talk X inside Track 2.
- Talk Y **is placed** in Track 2 after Talk X

However, I tried all these algorythms against the following Jest tests (was trying to get the same output as the one in the PDF document). And some tests would still fail. I later confirmed with a spreadsheet, going Talk by Talk and writing down the numbers, that the algorythm written by the programmer doesn't follow a linear fashion like the algorythms I mentioned above. Which is ok, that's why the PDF mentions:

"Note that depending on how you choose to complete this problem, your solution may give a different ordering or combination of talks into tracks. This is acceptable; you don't need to exactly duplicate the sample output given here."

But still, I'm very test driven so I'm sad that I coudln't test my function against the output of the PDF. But I know it's generating an Array of two Tracks as expect and all the other tests are working, so I know I'm safe.

Anyway, I'll leave here the tests I was running, just in case you are interested in taking a look.

        test('buildTrackList() places the talks and Track arrays have the expected lengths', () => {
        // Add Talks to arrayOfTalks
        let arrayOfTalks = [writingFastTestsAgainstEnterpriseRails, overdoingitinPython, luafortheMasses, rubyErrorsfromMismatchedGemVersions, 
            commonRubyErrors, railsforPythonDevelopers, communicatingOverDistance, accountingDrivenDevelopment, woah, sitDownandWrite, 
            pairProgrammingvsNoise, railsMagic, rubyonRailsWhyWeShouldMoveOn, clojureAteScalaonmyproject, programmingintheBoondocksofSeattle, 
            rubyVsClojureforBackEndDevelopment, rubyonRailsLegacyAppMaintenance, aWorldWithoutHackerNews, userInterfaceCSSinRailsApps];
        
        onlyOneConference.buildTrackList(arrayOfTalks);

        let firstTrack: Track = onlyOneConference.tracks[0];
        let secondTrack: Track = onlyOneConference.tracks[1];

        expect(firstTrack.sessions.morning.talks).toHaveLength(4);
        expect(firstTrack.sessions.afternoon.talks).toHaveLength(6);
        expect(secondTrack.sessions.morning.talks).toHaveLength(4);
        expect(secondTrack.sessions.afternoon.talks).toHaveLength(6);
        });
        
        test('buildTrackList() places the talks in the expected Track arrays', () => {
            // Add Talks to arrayOfTalks
            let arrayOfTalks = [writingFastTestsAgainstEnterpriseRails, overdoingitinPython, luafortheMasses, rubyErrorsfromMismatchedGemVersions, 
                commonRubyErrors, railsforPythonDevelopers, communicatingOverDistance, accountingDrivenDevelopment, woah, sitDownandWrite, 
                pairProgrammingvsNoise, railsMagic, rubyonRailsWhyWeShouldMoveOn, clojureAteScalaonmyproject, programmingintheBoondocksofSeattle, 
                rubyVsClojureforBackEndDevelopment, rubyonRailsLegacyAppMaintenance, aWorldWithoutHackerNews, userInterfaceCSSinRailsApps];
            
            onlyOneConference.buildTrackList(arrayOfTalks);
    
            let firstTrack: Track = onlyOneConference.tracks[0];
            let secondTrack: Track = onlyOneConference.tracks[1];

            // firstTrack has the expected morning talks
            expect(firstTrack.sessions.morning.talks).toEqual(expect.arrayContaining(
                [writingFastTestsAgainstEnterpriseRails, overdoingitinPython, luafortheMasses, rubyErrorsfromMismatchedGemVersions]
            ));
            // firstTrack has the expected afternoon talks
            expect(firstTrack.sessions.afternoon.talks).toEqual(expect.arrayContaining(
                [rubyonRailsWhyWeShouldMoveOn, commonRubyErrors, pairProgrammingvsNoise, programmingintheBoondocksofSeattle, rubyVsClojureforBackEndDevelopment, userInterfaceCSSinRailsApps]
            ));

            // secondTrack has the expected morning talks
            expect(secondTrack.sessions.morning.talks).toEqual(expect.arrayContaining(
                [communicatingOverDistance, railsMagic, woah, sitDownandWrite]
            ));
            // secondTrack has the expected afternoon talks
            expect(secondTrack.sessions.afternoon.talks).toEqual(expect.arrayContaining(
                [accountingDrivenDevelopment, clojureAteScalaonmyproject, aWorldWithoutHackerNews, rubyonRailsLegacyAppMaintenance, railsforPythonDevelopers]
            ));
        });

Since the output in the PDF doesn't follow a linear fashion, I will build my own test. I will create make belief conference with some random Talks and then I will test my buildTrackList method against it. It needs to correctly guess the start of Networking Events and other important things like arrayLength in morning and afternoon sessions.

**Evening Update**

Ok, I just finished running tests against my custom Conference. The talks are placed where they are expected to and the networking event start times are being correctly assigned.

I just finished the major back end logic for the application. I'm very happy I choose to go with TypeScript and Jest as it decreased my development time significantly. 

This weekend I can finally go full-time on this project, so I will now start building the front-end.
I want something simple that works. If I go full-time on Saturday and Sunday, I estimate to have the project finished by Wednesday. I will look into some React Libraries like React-Spring, which I am curious about, maybe I can implement some features on this project. Looking forward to tomorrow.

## **18/09/2021 - Day 6**

**Morning**

I just finished coding the basic logic for rendering track lists to the DOM and it's working. It's obviously very basic, no styling, but I'm happy, the logic is working and that it's rendering as expected.

It's the first time I'm using Typescript in a React App, so I did get some warnings like:

- "TypeScript error Parameter 'props' implicitly has an 'any' type"
- "Component cannot be used as a JSX component. Its return type 'Element[][]"

Both were pretty easy to solve just by googling and adding an Interface for props and fragments <> to the return statement.

I'm happy how things are progressing, I will keep working on this app today.

### **Building the front-end gameplan**
- *Frameworks and Libraries*

    - Yesterday I did take a look at **Material UI** and I really liked the plug & play aspect of it. There's no need to re-invent the wheel and worry about styling when I have something ready to use like Material UI. I will use it for the first time and take it as an opportunity to learn a new Framework.
    - I might use **React Spring** for some cool-looking effects. Again, I've never used it, but I will take it as an opportunity to learn a new Library.

<br>

- *User Interface*

    - I will be using basic inputs to capture the Talk title and Talk duration. I will add a checkbox that will tell my back-end if the Talk 'isLightning' or not - when checked, the minutes input will clear and be disabled.
    - I will also add some ADD and REMOVE buttons to add and remove inputs, so that the user can add more Talks or remove ones that they don't want to submit.
    - I will add a submit button, something like: 'Plan Conference' that, onClick, will submit the info to buildTrackList() and will mount the Component "Conference" in the DOM.
    - This Conference Component, obviously shows the Tracks with the start times for Talks, Lunch and Networking Events.
    - When the Conference Component is mounted, the Component that has the inputs and submits will be unMounted.
    - Then, under the tracks, which will probably be displayed as "cards" in a grid system, there will be two buttons:
        - One button will let the user go back to plannig a new conference with talks (unmounts Conference Component and mounts Inputs/Submit Component again).
        - Another button will be "About The Developer", whick will show a Modal Pop-up with my contact information on the screen.

        <br>

-  *Features*
    - Assuming I have time, I will create new branches and work on features I might want to add like:
        - **TextArea** - user can just paste a text with the format "Talk title, 40 minutes" on each line and the application will output the Tracks as before. This will be an alternative to the standard Input fields.
        - **Dark Mode** - pretty straight forward, just a toggle on/off between Light Mode and Dark Mode

Maybe later I will come up with other cool features, but that's all for now.




