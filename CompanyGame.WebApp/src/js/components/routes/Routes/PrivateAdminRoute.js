import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
//login BL

const RedirectToAdministration = () => (
    <Redirect to={{
        pathname: '/administration'
    }} />
);


function decide(component) {
    if (true) {

    }
}

export default ({ component: Component, path, exact }) => (
    <Route exact={exact} path={path}
        render={(props) => (true ? <Component {...props} /> : <RedirectToAdministration />)} />
)