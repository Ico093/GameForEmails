import React from 'react';
import TextField from 'material-ui/TextField';

const CompanyTextField = ({ name, type, value, hintText, floatingLabelText, fullWidth = false, errorText, disabled = false, onChange }) => {
    return (
        <TextField
            name={name}
            type={type}
            value={value}
            hintText={hintText}
            floatingLabelText={floatingLabelText}
            fullWidth={fullWidth}
            errorText={errorText}
            disabled={disabled}
            onChange={onChange}
        />
    );
};

export default CompanyTextField;