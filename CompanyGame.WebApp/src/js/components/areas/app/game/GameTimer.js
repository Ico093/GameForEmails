import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.timeoutId = 0;

        this.state = {
            timeLeft: props.timeLeft
        };

        this.reduceTimeTick();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    reduceTimeTick() {
        this.timeoutId = setTimeout(() => {
            let timeLeft = this.props.timeLeft - 1;

            this.props.onTimeUpdate(timeLeft);

            if (this.props.timeLeft === 0) {
                clearTimeout(this.timeoutId);
                this.props.onFinish();
                return;
            }
            
            this.reduceTimeTick();
        }, 1000);
    }

    render() {
        const minutes = Math.floor(this.props.timeLeft / 60);
        const seconds = this.props.timeLeft % 60;

        return (
            <span className={this.props.className}>{`${minutes}min : ${seconds}sec`}</span>
        );
    }
}

export default Timer;