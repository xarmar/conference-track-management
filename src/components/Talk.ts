import React, {Component} from 'react'

class Talk extends Component<any, any> {

    duration: Number;
    title: String;

    constructor(duration: Number, title: String,  props: any) {
        super(props);
        this.duration = duration
        this.title = title;
    }

    render() {
        return null
    }
}

export default Talk