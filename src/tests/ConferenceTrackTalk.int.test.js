import Conference from "../components/Conference";
import Track from "../components/Track";
import Talk from "../components/Talk";

// This file does integration testing between the three Componentes: Conference, Track and Talk

describe("Track Component can keep track of it's children Talks", () => {
    
    // Create dummy Talks
    let loveCoding = new Talk(60, 'Why I love coding', null);
    let livingInGermany = new Talk(45, 'Living in Germany', null);
    let afternoonCoffee = new Talk (30, 'Afternoon Coffee', null);

    // Create dummy Track
    let morningStartingTime = new Date();
    morningStartingTime.setHours(9,0,0);
    let afternoonStartTime = new Date();
    afternoonStartTime.setHours(13,0,0);
    let trackOne = new Track(0, morningStartingTime, afternoonStartTime);

    // Add Talks to Track arrays
    trackOne.sessions.morning.talks.push(loveCoding);
    trackOne.sessions.morning.talks.push(livingInGermany);
    trackOne.sessions.afternoon.talks.push(afternoonCoffee);

    test('Check if Talks were corretly added to Track arrays', () => {
        expect(trackOne.sessions.morning).toEqual(expect.objectContaining({
            talks: [loveCoding, livingInGermany]
        }));
        expect(trackOne.sessions.afternoon).toEqual(expect.objectContaining({
            talks: [afternoonCoffee]
        }));
    });
});