import React from 'react';

import CompanyLogo from '../CompanyLogo';
import PreLoader from './PreLoader';

const CompanyHeader = ({ loading }) => {
    return (
        <div className="header">
            <div className="row">
                {loading && <PreLoader />}
            </div>
            <div className="row valign-wrapper clearPosition">
                <div style={{ width: '100%' }}><CompanyLogo /></div>
            </div>
        </div>
    )
};

export default CompanyHeader;