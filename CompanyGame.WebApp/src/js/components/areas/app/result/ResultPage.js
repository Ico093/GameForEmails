import React, { Component } from 'react';
import { withRouter } from 'react-router'

import ExperainPaper from '../../../common/ExperainPaper';
import CompanyRaisedButton from '../../../common/CompanyRaisedButton';

class ResultPage extends Component {
    constructor(props) {
        super(props);

        this.onBackClick = this.onBackClick.bind(this);
    }

    onBackClick() {
        this.props.history.push('/start');
    }

    render() {
        const { location } = this.props;
        const score = location.state ? location.state.score : 0;
        const hasWon = location.state ? location.state.hasWon : false;

        return (
            <div className="row resultPage valign-wrapper">
                <div className="col s12">
                    <ExperainPaper className="center-align">
                        <img src={require('../../../../../img/Company/chart.jpg')} />
                        <h1>Your score is {score}</h1>
                        <h2>Go to the Company booth.</h2>
                        <h2>Check the ranking!</h2>
                        {hasWon && <h2>Claim your reward!</h2>}
                    </ExperainPaper>
                </div>
            </div>
        );
    }
}

export default withRouter(ResultPage);