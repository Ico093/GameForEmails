import React, { Component } from 'react';

import CompanyRaisedButton from '../../../common/CompanyRaisedButton';

const GameButtons = ({ currentProgress, steps, disabled, onNextClick, onPreviousClick, onFinishClick }) => {
    const previousButtonShow = currentProgress != 1;
    const nextButtonShow = currentProgress != steps;
    const finishButtonShow = !nextButtonShow;

    return (
        <div style={{ marginTop: '20px' }}>
            {previousButtonShow && <CompanyRaisedButton label="Previous" onClick={onPreviousClick} primary={true} disabled={disabled} style={{ marginRight: '10px' }} />}
            {nextButtonShow && <CompanyRaisedButton label="Next" onClick={onNextClick} primary={true} disabled={disabled} />}
            {finishButtonShow && <CompanyRaisedButton label="Finish" onClick={onFinishClick} secondary={true} disabled={disabled} />}
        </div>
    )
}

export default GameButtons;