import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Main } from '../components/Main/Landing';
import LoginContainer from '../containers/LoginContainer/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer/RegisterContainer';
import ChangePassword from '../components/ForgotPassword/ChangePassword/ChangePassword';
import CheckEmail from '../components/ForgotPassword/CheckEmail/CheckEmail';
import ProfileContainer from '../containers/ProfileContainer/ProfileContainer';

const routes = (
    <Router>
        <Route exact path='/' component={Main} />
        <div className='container-fluid header'>
            <div className='row justify-content-center align-items-center'>
                <div className='col-sm-8 col-md-6 col-xl-5'>
                    <Route exact path='/register' component={RegisterContainer} />
                </div>
            </div>
        </div>
        <Route exact path='/login/:token?' component={LoginContainer} />
        <Route exact path='/password-reset' component={CheckEmail} />
        <Route exact path='/password-reset/:token' component={ChangePassword} />
        <Route exact path='/profile' component={ProfileContainer}/>
    </Router>
);

export default routes;
