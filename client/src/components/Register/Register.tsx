import React from "react";
import { Field } from "redux-form";
import { Spinner } from "reactstrap";

class Register extends React.Component<any> {
  renderField = ({ input, label, type }: any) => (
    <div>
      <label>{label}</label>

      <input {...input} type={type} />
    </div>
  );
  render() {
    const { handleSubmit, onSubmit, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="username"
            type="text"
            component={this.renderField}
            label="username"
          />
          <Field
            name="fullName"
            type="text"
            component={this.renderField}
            label="fullname"
          />
          <Field
            name="email"
            type="text"
            component={this.renderField}
            label="email"
          />
          <Field
            name="password"
            type="password"
            component={this.renderField}
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
