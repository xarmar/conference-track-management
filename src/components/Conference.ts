import React, {Component} from 'react';
import Track from './Track';

class Conference extends Component<any,any> {

    tracks: Track[]
    
    constructor(tracks: Track[], props: any) {
        super(props);
        this.tracks = tracks;
    }

    render() {
        return null
    }
}

export default Conference