import React, { ReactElement } from 'react';
import RegisterContainer from '../../containers/RegisterContainer';

export const RegisterRoute = (): ReactElement => (
    <div className='container-fluid header'>
        <div className='row justify-content-center align-items-center'>
            <div className='col-sm-8 col-md-6 col-xl-5'>
                <RegisterContainer />
            </div>
        </div>
    </div>
);
