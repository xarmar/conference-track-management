import React, { Component, useState } from 'react';
import { Container } from '@mui/material';
import Form from './SliderBuilder';
import Conference from './Conference';
import TextFieldGenerator from './TextFieldBuilder';
import MainMenu from './MainMenu';
import { Box } from '@mui/system';

class ControllerApi extends Component {

    constructor(props) {
        super();

        // Keeps state of what should be mounted unmounted
        this.state = {
            conference: "",
            showConference: false,
            showMainMenu: true,
            showSliderBuilder: false,
            showTextFieldBuilder: false
        }

    this.renderMainMenuComponent = this.renderMainMenuComponent.bind(this);
    this.unmontMainMenuComponent = this.unmontMainMenuComponent.bind(this);

    this.renderSliderBuilderComponent = this.renderSliderBuilderComponent.bind(this);
    this.unmountSliderBuilderComponent = this.unmountSliderBuilderComponent.bind(this);

    this.renderTextFieldBuilderComponent = this.renderTextFieldBuilderComponent.bind(this);
    this.unmountTextFieldBuilderComponent = this.unmountTextFieldBuilderComponent.bind(this);

    this.renderConferenceComponent = this.renderConferenceComponent.bind(this);
    this.unMountConferenceComponent = this.unMountConferenceComponent.bind(this);
    }

    // MAIN MENU COMPONENT ---------------------------------
    // Renders Main Menu the DOM
    renderMainMenuComponent() {
        this.setState({
            showMainMenu: true
        });
    }
    // Unmount Main Menu Component
    unmontMainMenuComponent() {
        this.setState({
            showMainMenu: false
        });
    }


    // SLIDER COMPONENT ---------------------------------
    // Renders Slider Builder to the DOM
    renderSliderBuilderComponent() {
        this.setState({
            showSliderBuilder: true
        });
    }
    // Unmounts the Slider Component
    unmountSliderBuilderComponent() {
        this.setState({
            showSliderBuilder: false
        });
    }

    // TEXTFIELD COMPONENT ---------------------------------
    // Renders Text Field Builder to the DOM
    renderTextFieldBuilderComponent() {
        this.setState({
            showTextFieldBuilder: true
        });
    }
    // Unmounts TextFieldBuilder Component
    unmountTextFieldBuilderComponent() {
        this.setState({
            showTextFieldBuilder: false
        });
    }

    // CONFERENCE COMPONENT ---------------------------------
    // Renders Conference Component to the DOM
    renderConferenceComponent(arrayOfTalks) {
        const newConference = new Conference([], null);
        newConference.buildTrackList(arrayOfTalks);
        this.setState({
            conference: newConference,
            showConference: true,
        })
    }
    // Takes the user back to the initial page
    unMountConferenceComponent() {
        this.setState({
            showConference: false,
            conference: ""
        })
    }

    render() {
        return (
            <Container>
                <Box id="main-content-container-grid" container direction="row" className="margin-auto" >
                    {this.state.showMainMenu && <MainMenu 
                    renderTextFieldBuilderComponent={this.renderTextFieldBuilderComponent}
                    renderSliderBuilderComponent={this.renderSliderBuilderComponent} />}

                    {this.state.showSliderBuilder && <Form 
                    unmountSliderBuilderComponent={this.unmountSliderBuilderComponent} 
                    renderConferenceComponent={this.renderConferenceComponent} />}

                    {this.state.showConference && <Conference 
                    conference={this.state.conference} 
                    unMountConferenceMountForm={this.unMountConferenceMountForm} 
                    renderMainMenuComponent={this.renderMainMenuComponent} />}

                    {this.state.showTextFieldOption && <TextFieldGenerator 
                    unmountTextFieldOptionComponent={this.unmountTextFieldOptionComponent} 
                    renderConferenceComponent={this.renderConferenceComponent} />}
                </Box>
            </Container>
        )
    }
}

export default ControllerApi