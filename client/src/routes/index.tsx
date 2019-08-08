import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "../components/Main/MainContainer"
import LoginContainer from "../components/Login/LoginContainer";
import RegisterContainer from "../components/Register/RegisterContainer";
import Forgot from "../components/Forgot/Forgot";

const routes = (
    <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/auth/register" component={RegisterContainer} />
        <Route exact path="/auth/login" component={LoginContainer} />
        <Route exact path="/auth/password/reset" component={Forgot} />
    </Router>
)

export default routes;