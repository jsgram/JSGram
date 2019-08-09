import React from 'react';

import CheckEmailContainer from "./CheckEmail/CheckEmailContainer";
import ChangePassword from "./ChangePassword/ChangePassword";

const ForgotPassword: React.FC = () => {
    return (
        <div>
            <CheckEmailContainer/>
            <ChangePassword/>
        </div>
    )
};

export default ForgotPassword;
