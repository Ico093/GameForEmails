import React, { Component } from 'react';

import ExperainPaper from '../../../common/ExperainPaper';
import CompanyTextField from '../../../common/CompanyTextField';
import CompanyRaisedButton from '../../../common/CompanyRaisedButton';
import CompanySelectField from '../../../common/CompanySelectField';
import CompanyMenuItem from '../../../common/CompanyMenuItem';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class SignInForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const LoginForm = (
            <div className="row">
                <div className="center-align">
                    <h1 className="primaryBlue">Sign up for the game</h1>

                    <a className="sbtn waves-effect sbtn-facebook" onClick={this.props.logInWithFacebook}><i className="sbtn-inner sbtn-inner-facebook left"></i> Facebook</a>
                    <a className="sbtn sbtn-googlePlus waves-effect" onClick={this.props.logInWithGoogle}><i className="sbtn-inner sbtn-inner-googlePlus left"></i> Google+</a>
                    {/*<a className="sbtn sbtn-linkedIn waves-effect" onClick={this.props.logInWithLinkedIn}><i className="sbtn-inner sbtn-inner-linkedIn left"></i> LinkedIn</a>*/}
                </div>

                <CompanyTextField
                    name="firstname"
                    type="text"
                    floatingLabelText="First name"
                    fullWidth={true}
                    value={this.props.user.firstname}
                    errorText={this.props.errors.firstname}
                    onChange={this.props.onChange} />

                <CompanyTextField
                    name="lastname"
                    type="text"
                    floatingLabelText="Last name"
                    fullWidth={true}
                    value={this.props.user.lastname}
                    errorText={this.props.errors.lastname}
                    onChange={this.props.onChange} />

                <CompanyTextField
                    name="email"
                    type="email"
                    floatingLabelText="Email address"
                    fullWidth={true}
                    value={this.props.user.email}
                    errorText={this.props.errors.email}
                    onChange={this.props.onChange}
                />

                <CompanyTextField
                    name="jobTitle"
                    type="text"
                    floatingLabelText="Job title"
                    fullWidth={true}
                    value={this.props.user.jobTitle}
                    errorText={this.props.errors.jobTitle}
                    onChange={this.props.onChange}
                />

                <CompanyRaisedButton
                    primary={true}
                    fullWidth={true}
                    label="Register"
                    onClick={this.props.onRegister} />
            </div >
        );

        const PlayTheGameButton = (
            <CompanyRaisedButton
                primary={true}
                fullWidth={true}
                label="Lets play"
                onClick={this.props.onLetsPlayClick} />
        )

        const AlreadyPlayedDiv = (
            <div className="row">
                <div className="center-align">
                    <h1 className="primaryBlue">Sorry. You already gave it a shot :/</h1>
                </div>
            </div >
        );

        return (
            <ExperainPaper>
                {!this.props.isUserLogged && LoginForm}
                {this.props.isUserLogged && !this.props.hasUserPlayed && PlayTheGameButton}
                {this.props.isUserLogged && this.props.hasUserPlayed && AlreadyPlayedDiv}
            </ExperainPaper>
        );
    }
}