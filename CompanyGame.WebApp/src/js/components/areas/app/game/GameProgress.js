import React from 'react';

const GameProgress = ({ currentProgress, steps }) => {
    return (
        <span>{currentProgress}/{steps}</span>
    );
}

export default GameProgress;