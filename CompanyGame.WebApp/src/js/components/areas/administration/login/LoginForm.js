import React from 'react';

import CompanyTextField from '../../../common/CompanyTextField';
import CompanyRaisedButton from '../../../common/CompanyRaisedButton';


const LoginForm = ({ user, onChange, onSubmit }) => {
    return (
        <div className="adminLogin">
            <CompanyTextField
                name="username"
                type="text"
                floatingLabelText="Username"
                fullWidth={true}
                value={user.username}
                onChange={onChange} />

            <CompanyTextField
                name="password"
                type="password"
                floatingLabelText="Password"
                fullWidth={true}
                value={user.password}
                onChange={onChange} />

            <CompanyRaisedButton
                primary={true}
                fullWidth={true}
                label="Login"
                onClick={onSubmit}
            />
        </div>
    );
}

export default LoginForm;