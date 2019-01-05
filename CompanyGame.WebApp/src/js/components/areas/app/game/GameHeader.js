import React from 'react';

import CompanyPaper from '../../../common/ExperainPaper';

import GameProgress from './GameProgress';
import GameTimer from './GameTimer';

const GameHeader = ({ timeLeft, onFinish, onTimeUpdate, currentProgress, steps }) => {
    const style = {
        paddingBottom: '40px'
    };

    return (
        <CompanyPaper style={style} >
            <div className="col s6">
                <GameProgress
                    currentProgress={currentProgress}
                    steps={steps} />
            </div>
            <div className="col s6 right-align">
                <GameTimer
                    timeLeft={timeLeft}
                    onTimeUpdate={onTimeUpdate}
                    onFinish={onFinish} />
            </div>
        </CompanyPaper >
    );
}

export default GameHeader;