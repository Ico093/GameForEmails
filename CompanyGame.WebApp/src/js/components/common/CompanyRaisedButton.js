import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const CompanyRaisedButton = ({ label, primary = false, secondary = false, onClick, fullWidth = false, disabled = false, style }) => {
    return (
        <RaisedButton
            label={label}
            primary={primary}
            secondary={secondary}
            onClick={onClick}
            fullWidth={fullWidth}
            style={style}
            disabled={disabled}
            onClick={onClick} />
    );
};

export default CompanyRaisedButton;