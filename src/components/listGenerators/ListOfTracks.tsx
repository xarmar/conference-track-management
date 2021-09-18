import Track from '../Track';
import * as React from 'react'

interface listOfTracksProps {
    arrayOfTracks: Track[];
}

const ListOfTracks = (props: listOfTracksProps) => {

    const arrayOfTracks: Track[] = props.arrayOfTracks;
        
    // Do not run if arrayOfTracks length is 0
    if(arrayOfTracks.length === 0) {
            return null
    }

    // Map arrayOfTracks to return an new array of divs that contain Track Components
    const trackList = arrayOfTracks.map((track) => (
        <div key={track.trackNumber} className="track-container">
            <Track track={track}/>
        </div>
    ));
    
    return <>{
        [trackList]
    }</>
}

export default ListOfTracks