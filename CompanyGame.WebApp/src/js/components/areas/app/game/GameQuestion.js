import React, { Component } from 'react';
import CompanyPaper from '../../../common/ExperainPaper';

const GameQuestion = ({ task, question }) => {


    return (
        <div>
            <CompanyPaper>
                <div dangerouslySetInnerHTML={{ __html: task }} />
            </CompanyPaper>
            
            <h2 className="primaryViolet">{question}</h2>
        </div>
    )
}

export default GameQuestion;