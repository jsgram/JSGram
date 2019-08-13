import React, { ReactElement } from 'react';
import CheckEmailContainer from './CheckEmail/CheckEmailContainer';
import ChangePasswordContainer from './ChangePassword/ChangePasswordContainer';

const ForgotPassword: React.FC = (): ReactElement => {
    return (
        <div className='wrapper'>
            <CheckEmailContainer/>
            <ChangePasswordContainer/>
        </div>
    );
};

export default ForgotPassword;
