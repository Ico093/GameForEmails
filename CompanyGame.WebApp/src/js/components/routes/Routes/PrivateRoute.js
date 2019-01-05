import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
//login BL

const RedirectToInitialPage = () => (
    <Redirect to={{
        pathname: '/'
    }} />
);

export default ({ component: Component, path, exact, isLoggedIn, additionalCondition = true }) => (
    <Route exact={exact} path={path}
        render={(props) => (isLoggedIn && additionalCondition ? <Component {...props} /> : <RedirectToInitialPage />)} />
)