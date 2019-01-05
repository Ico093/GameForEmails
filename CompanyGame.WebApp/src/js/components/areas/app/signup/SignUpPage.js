import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isEmptyObject } from '../../../../common/extensions/objectExtensions';
import { isValidEmail } from '../../../../common/helpers/emailHelper';

import * as userActions from '../../../../actions/userActions';

import SignUpForm from './SignUpForm';
import exprianLogo from '../../../../../img/Company/CompanyLogo.png';

import config from '../../../../api/config';


class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                jobTitle: '',
                isLoggedIn: false
            },
            errors: {},
            hasTriedToSubmit: false
        }

        this.logInWithFacebook = this.logInWithFacebook.bind(this);
        this.logInWithGoogle = this.logInWithGoogle.bind(this);
        this.logInWithLinkedIn = this.logInWithLinkedIn.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.updateUserState = this.updateUserState.bind(this);
        this.register = this.register.bind(this);
        this.letsPlay = this.letsPlay.bind(this);
    }

    componentWillMount() {
        //Get providers only if user isn't logged
        if (!this.props.state.isUserLogged && this.props.state.providers.length === 0) {
            this.props.userActions.getAllLoginProviders().then(() => {
                this.facebookProvider = this.props.state.providers.find(x => x.name == 'Facebook');
                this.googleProvider = this.props.state.providers.find(x => x.name == 'Google');
                this.linkedinProvider = this.props.state.providers.find(x => x.name == 'LinkedIn');
            });
        }

        if (!this.props.state.isUserLogged && this.props.location.hash.length !== 0) {
            const queryObject = this.parseQueryStringToObject(this.props.location.hash.substring(1));

            if (queryObject.token_type && queryObject.access_token) {
                this.props.userActions.getExternalUserInfo(queryObject.token_type, queryObject.access_token).then(userData => {
                    if (userData.hasRegistered) {
                        this.props.userActions.loginExternalUser(queryObject.token_type, queryObject.access_token);
                    } else {
                        var names = userData.name.split(' ').filter((value)=>{return value!=""});
                        var firstName = names.length>0?names[0]:"";
                        var lastName = names.length>1?names[1]:"";

                        var user = {
                            email: userData.email,
                            firstName: firstName,
                            lastName:lastName
                        };

                        this.props.userActions.registerExternalUser(user, queryObject.token_type, queryObject.access_token);
                    }
                });
            }
        }
    }

    parseQueryStringToObject(query) {
        return JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    }

    // Social buttons functions
    logInWithFacebook() {
        window.location.replace(config.apiBaseUrl + this.facebookProvider.url);
    }

    logInWithGoogle() {
        window.location.replace(config.apiBaseUrl + this.googleProvider.url);
    }

    logInWithLinkedIn() {
        window.location.replace(config.apiBaseUrl + this.linkedinProvider.url);
    }

    updateUserState(event) {
        const field = event.target.name;
        let user = this.state.user;
        user[field] = event.target.value;
        this.setState({ user: user });

        if (this.state.hasTriedToSubmit) {
            this.isFormValid();
        }
    }

    isFormValid() {
        const errors = {};
        const user = this.state.user;

        if (user.firstname === '') {
            errors.firstname = 'Required';
        }

        if (user.lastname === '') {
            errors.lastname = 'Required';
        }

        if (user.email === '') {
            errors.email = 'Required';
        }
        else {
            if (!isValidEmail(user.email)) {
                errors.email = 'Not valid';
            }
        }

        if (user.jobTitle === '') {
            errors.jobTitle = 'Required';
        }

        this.setState({
            errors: errors,
            hasTriedToSubmit: true
        });

        return isEmptyObject(errors);
    }

    register(event) {
        event.preventDefault();

        if (this.isFormValid()) {
            this.props.userActions.registerUser(this.state.user);
        }
    }

    letsPlay(event) {
        // this.props.userActions.getUserInfo();

        this.props.history.push('/game');
    }

    render() {
        return (
            <div className="row signupPage valign-wrapper">
                <div className="col s8 offset-s2">
                    <SignUpForm
                        isUserLogged={this.props.state.isUserLogged}
                        hasUserPlayed={this.props.state.hasUserPlayed}
                        logInWithFacebook={this.logInWithFacebook}
                        logInWithGoogle={this.logInWithGoogle}
                        logInWithLinkedIn={this.logInWithLinkedIn}
                        user={this.state.user}
                        errors={this.state.errors}
                        onChange={this.updateUserState}
                        selectOnChange={this.updateUserStateFromSelect}
                        onRegister={this.register}
                        onLetsPlayClick={this.letsPlay} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            providers: state.providers,
            isUserLogged: state.user.isLogged,
            hasUserPlayed: state.user.hasPlayed
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);