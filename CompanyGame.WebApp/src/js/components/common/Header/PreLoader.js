import React from 'react';

const PreLoader = () => {
    return (
        <div className="progress"  style={{ width: '100%' }}>
            <div className="indeterminate"></div>
        </div>
    )
}

export default PreLoader;