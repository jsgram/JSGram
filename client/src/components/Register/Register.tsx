import React from "react";
import { Field } from "redux-form";
import { Spinner } from "reactstrap";
import { renderField } from "../commonComponents/reduxFormFields";

class Register extends React.Component<any> {
  render() {
    const { handleSubmit, onSubmit, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="username"
            type="text"
            component={renderField}
            label="username"
          />
          <Field
            name="fullName"
            type="text"
            component={renderField}
            label="fullname"
          />
          <Field
            name="email"
            type="text"
            component={renderField}
            label="email"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="password"
          />
          <button disabled={submitting}>Register</button>
          {submitting && <Spinner color="dark" />}
        </form>
      </div>
    );
  }
}

export default Register;
