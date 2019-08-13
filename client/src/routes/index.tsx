import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Main } from "../components/Main/Landing"
import LoginContainer from "../components/Login/LoginContainer";
import RegisterContainer from "../components/Register/RegisterContainer";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

const routes = (
    <Router>
        <Route exact path="/" component={Main} />
        <div className="container-fluid header">
            <div className="row justify-content-center align-items-center">
                <div className="col-sm-8 col-md-6 col-xl-5">
                    <Route exact path="/register" component={RegisterContainer} />
                </div>
            </div>
        </div>
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/password-reset" component={ForgotPassword} />
    </Router>
)

export default routes;