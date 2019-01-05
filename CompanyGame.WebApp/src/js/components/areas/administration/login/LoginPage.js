import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../../../actions/userActions';

import LoginForm from './LoginForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            }
        }

        this.updateUserState = this.updateUserState.bind(this);
        this.login = this.login.bind(this);
    }

    updateUserState(event) {
        const field = event.target.name;
        let user = this.state.user;
        user[field] = event.target.value;
        this.setState({ user: user });
    }

    login() {
        this.props.userActions.loginAdminUser(this.state.user).then(()=>{
            this.props.history.push('/administration/results')
        }).catch((error)=>{
            console.log('Where are you going maybe?')
        });
    }

    render() {
        return (
            <LoginForm
                user={this.state.user}
                onChange={this.updateUserState}
                onSubmit={this.login} />
        );
    }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return{
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);