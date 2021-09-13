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