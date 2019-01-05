import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import { connect } from 'react-redux';

// Private routes
import PrivateAdminRoute from './Routes/PrivateAdminRoute';
import PrivateRoute from './Routes/PrivateRoute';

// Header and Footer
import CompanyHeader from '../common/Header/CompanyHeader';
import CompanyFooter from '../common/Footer/CompanyFooter';

// Common Pages
import Page404 from '../areas/common/404/Page404';

// Game Pages
import SignUpPage from '../areas/app/signup/SignUpPage';
import GamePage from '../areas/app/game/GamePage';
import ResultPage from '../areas/app/result/ResultPage';

// Administration Pages
import LoginPage from '../areas/administration/login/LoginPage';
import ManageQuestionsPage from '../areas/administration/questions/ManageQuestionsPage';
import ManageResultsPage from '../areas/administration/results/ManageResultsPage';

class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="appContainer">
                    <CompanyHeader loading={this.props.state.loading} />
                    <div className="content">
                        <Switch>
                            {/*Game paths*/}
                            <Route exact path="/" component={SignUpPage} />
                            <PrivateRoute path="/game" component={GamePage} isLoggedIn={this.props.state.isUserloggedIn} additionalCondition={!this.props.state.hasUserPlayed} />
                            <PrivateRoute path="/score" component={ResultPage} isLoggedIn={this.props.state.isUserloggedIn} />

                            {/*Administration paths onEnter={requireAuth} */}
                            <Route exact path="/administration" component={LoginPage} />
                            <PrivateAdminRoute exact path="/administration/questions" component={ManageQuestionsPage} />
                            <PrivateAdminRoute exact path="/administration/results" component={ManageResultsPage} />

                            <Route component={Page404} />
                        </Switch>
                    </div>
                    <CompanyFooter />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state: {
            loading: state.pendingAjaxCalls > 0,
            isUserloggedIn: state.user.isLogged,
            hasUserPlayed: state.user.hasPlayed
        }
    }
}

export default connect(mapStateToProps)(AppRouter);