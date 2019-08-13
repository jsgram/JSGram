import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { Button, Form, FormGroup } from "reactstrap";
import { renderField } from "../../commonComponents/reduxFormFields";
import { checkEmail } from "../../../store/checkEmail/actions";
import validate from '../../../utils/validation'
import "./../../styles/style.scss";
import logo from "./../../assets/logo.png";

class CheckEmailContainer extends React.Component<any> {
  onSubmit = (email: string) => {
    return this.props.checkEmail(email);
  };
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container-fluid header">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-8 col-md-6 col-xl-5">
            <Form className="mt-4 bg-white" onSubmit={handleSubmit(this.onSubmit)}>
              <div className="border">
                <FormGroup className="col-lg-10 offset-lg-1 text-center">
                  <Link to="/">
                    <img className="picture" src={logo} alt="logo" />
                  </Link>
                  <Field
                    name="email"
                    type="text"
                    component={renderField}
                    label="email"
                    className="form-control form-control-lg mt-3"
                    placeholder="E-mail"
                  />
                  <Button
                    className="mt-3"
                    disabled={submitting}
                    color="danger"
                    size="lg"
                    block
                  >
                    Send
                  </Button>
                  {submitting && <Spinner className="mt-3" color="dark" />}
                </FormGroup>
                <div className="or-devider">
                  <span />
                  OR
                  <span />
                </div>
                <FormGroup className="text-center login_google">
                  <p className="pt-2">
                    Still don't have an account?
                    <Link to="/register" className="pl-1 text-danger">
                      Register
                    </Link>
                  </p>
                </FormGroup>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { checkEmail }
)(
  reduxForm({
    form: "checkEmailForm",
    validate
  })(CheckEmailContainer)
);
