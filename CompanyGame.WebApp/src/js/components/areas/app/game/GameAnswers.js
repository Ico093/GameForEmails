import React, { Component } from 'react';

import CompanyTextField from '../../../common/CompanyTextField';
import CompanyRadioButtonGroup from '../../../common/CompanyRadioButtonGroup';
import CompanyRadioButton from '../../../common/CompanyRadioButton';

const GameAnswers = ({ answers, currentAnswer, disabled, onChange }) => {
    return (
        <div>
            {answers && answers.length != 0 &&
                <CompanyRadioButtonGroup name="answer" onChange={onChange} valueSelected={parseInt(currentAnswer)}>
                    {
                        answers.map((answer, index) => {
                            return (
                                <CompanyRadioButton
                                    key={index}
                                    label={answer}
                                    value={index}
                                    disabled={disabled} />
                            )
                        })
                    }
                </CompanyRadioButtonGroup>
            }

            {!answers &&
                <div>
                    <span className="primaryViolet" style={{fontSize:"1.5em"}}>Answer: </span>
                    <CompanyTextField name="answer" onChange={onChange} value={currentAnswer} disabled={disabled} />
                </div>
            }
        </div>
    )
}

export default GameAnswers;