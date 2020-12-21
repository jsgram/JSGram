import React, { ReactElement } from 'react';
import RegisterContainer from '../../containers/RegisterContainer';
import { UncontrolledAlert } from 'reactstrap';

export const RegisterRoute = (props: any): ReactElement => {
    const {error}: any = props.match.params;
    return (
        <>
            {error && (
                <UncontrolledAlert
                    color='danger'
                    className='position-fixed'
                >
                    {error}
                </UncontrolledAlert>
            )
            }
            <div className='container-fluid header'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-sm-8 col-md-6 col-xl-5'>
                        <RegisterContainer/>
                    </div>
                </div>
            </div>
        </>
    );
};
