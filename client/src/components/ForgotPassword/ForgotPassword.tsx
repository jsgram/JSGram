import React from 'react';

import CheckEmailContainer from "./CheckEmail/CheckEmailContainer";
import ChangePassword from "./ChangePassword/ChangePassword";

const ForgotPassword: React.FC = () => {
    return (
        <div className="wrapper">
            <CheckEmailContainer/>
            <ChangePassword/>
        </div>
    )
};

export default ForgotPassword;
