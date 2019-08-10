import React from "react";
import { Field } from "redux-form";
import { Spinner } from "reactstrap";

class Login extends React.Component<any> {
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
          <button disabled={submitting}>Submit</button>
          {submitting && <Spinner color="dark" />}
        </form>
      </div>
    );
  }
}

export default Login;
