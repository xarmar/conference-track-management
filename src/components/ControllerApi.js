import React, { Component, useState } from 'react';
import Grid from '@mui/material/Grid';
import AppHeader from './AppHeader';
import { Container } from '@mui/material';
import Form from './Form';
import Conference from './Conference';

class ControllerApi extends Component {

    constructor(props) {
        super();

        // Keeps state of what should be mounted unmounted
        this.state = {
            showForm: true,
            showConference: false,
            conference: ""
        }


    this.unmountFormComponent = this.unmountFormComponent.bind(this);
    this.renderConferenceComponent = this.renderConferenceComponent.bind(this);
    this.unMountConferenceMountForm = this.unMountConferenceMountForm.bind(this);

    }

    unmountFormComponent() {
        this.setState({
            showForm: false
        });
    }

    // Renders the Conference's Tracks to the UI
    renderConferenceComponent(arrayOfTalks) {
        const newConference = new Conference([], null);
        newConference.buildTrackList(arrayOfTalks);
        this.setState({
            conference: newConference,
            showConference: true,
        })
    }

    // Takes the user back to the initial page
    unMountConferenceMountForm() {
        this.setState({
            showConference: false,
            showForm: true,
            conference: ""
        })
    }

    render() {
        return (
            <Container>
                <Grid container direction="row">
                    <AppHeader /> 
                </Grid>
                <Grid id="main-content-container-grid" container >
                    {this.state.showForm && <Form unmountFormComponent={this.unmountFormComponent} renderConferenceComponent={this.renderConferenceComponent} />}
                    {this.state.showConference && <Conference conference={this.state.conference} unMountConferenceMountForm={this.unMountConferenceMountForm} /> }
                </Grid>
            </Container>
        )
    }
}

export default ControllerApi