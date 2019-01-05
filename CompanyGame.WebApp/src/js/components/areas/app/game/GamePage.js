import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as gameActions from '../../../../actions/gameActions';

import ExperainPaper from '../../../common/ExperainPaper';
import CompanyRaisedButton from '../../../common/CompanyRaisedButton';

import GameHeader from './GameHeader';
import GameQuestion from './GameQuestion';
import GameAnswers from './GameAnswers'
import GameButtons from './GameButtons';

class GamePage extends Component {
    constructor(props) {
        super(props);

        this.initialTime = 10 * 60;

        this.state = {
            questionNumber: 0,
            userAnswers: [],
            disabled: false,
            timeLeft: this.initialTime
        }

        this.onChange = this.onChange.bind(this);
        this.goToPreviousQuestion = this.goToPreviousQuestion.bind(this);
        this.goToNextQuestion = this.goToNextQuestion.bind(this);
        this.submitResult = this.submitResult.bind(this);
        this.timeUpdate = this.timeUpdate.bind(this);
        this.onUnload = this.onUnload.bind(this);
    }

    componentWillMount() {
        this.props.gameActions.loadTask().then(() => {
            this.setState({
                userAnswers: new Array(this.props.state.task.questions.length).fill('')
            });
        });

        window.addEventListener('beforeunload', this.onUnload);
    }

    componentWillUnmount(){
        this.props.gameActions.userFinishedPlaying();
    }

    onUnload() {
        this.props.gameActions.userFinishedPlaying();
        window.removeEventListener("beforeunload", this.onUnload)
    }

    goToPreviousQuestion() {
        this.setState({
            questionNumber: this.state.questionNumber - 1
        })
    }

    goToNextQuestion(event) {
        this.setState({
            questionNumber: this.state.questionNumber + 1,
        });
    }

    onChange(event) {
        const questionIndex = this.state.questionNumber;
        const value = event.target.value;
        let userAnswers = [...this.state.userAnswers]

        userAnswers[questionIndex] = value;

        this.setState({
            userAnswers: userAnswers
        });
    }

    timeUpdate(secondsLeft) {
        this.setState({
            timeLeft: secondsLeft
        });
    }

    submitResult() {
        this.setState({ disabled: true });

        this.props.gameActions.sendResult({
            answers: this.state.userAnswers,
            seconds: this.initialTime - this.state.timeLeft
        }).then((data) => {
            this.props.gameActions.clearTask();

            this.props.history.push('/score', data);
        });
    }

    render() {
        if (!this.props.state.task.task) {
            return (<div></div>);
        }

        let showSubmitButton = (this.props.state.task.questions.length === (this.state.questionNumber + 1));
        let buttonToShow;
        let task = this.props.state.task.task;
        let question = this.props.state.task.questions[this.state.questionNumber];
        let questionNumber = this.state.questionNumber + 1;
        let qustionsLength = this.props.state.task.questions.length;
        let currentAnswer = this.state.userAnswers.length - 1 >= this.state.questionNumber ? this.state.userAnswers[this.state.questionNumber] : '';

        return (
            <div className="clearPosition">
                <div className="row gamePage valign-wrapper">
                    <div className="col s12">
                        <GameHeader
                            timeLeft={this.state.timeLeft}
                            onTimeUpdate={this.timeUpdate}
                            onFinish={this.submitResult}
                            currentProgress={questionNumber}
                            steps={qustionsLength} />

                        <GameQuestion task={task} question={question.question} />
                        <GameAnswers
                            answers={question.answers}
                            currentAnswer={currentAnswer}
                            disabled={this.state.disabled}
                            onChange={this.onChange} />
                        <GameButtons
                            currentProgress={questionNumber}
                            steps={qustionsLength}
                            disabled={this.state.disabled}
                            onNextClick={this.goToNextQuestion}
                            onPreviousClick={this.goToPreviousQuestion}
                            onFinishClick={this.submitResult}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: {
            task: state.task
        }
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        gameActions: bindActionCreators(gameActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);