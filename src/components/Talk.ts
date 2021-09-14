import React, {Component} from 'react'

class Talk extends Component<any, any> {

    duration: Number;
    hasSpot: Boolean;
    title: String;
    startTime: any;

    constructor(duration: Number, title: String, props: any) {
        super(props);
        this.duration = duration;
        this.hasSpot = false;
        this.title = title;
        this.startTime = undefined;
    }

    render() {
        return null
    }

    // Checks if a Talk is already assigned to a Track
    talkAssignedToTrack() {
        if(this.hasSpot) {
            return true
        }
        return false
    }
}

export default Talk