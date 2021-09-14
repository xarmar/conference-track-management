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
}

export default Talk