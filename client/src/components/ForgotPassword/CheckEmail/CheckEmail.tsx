import React from "react";
import { Field } from "redux-form";
import { Spinner } from "reactstrap";

class ChekEmail extends React.Component<any> {
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
          <button disabled={submitting}>Submit</button>
          {submitting && <Spinner color="dark" />}
        </form>
      </div>
    );
  }
}

export default ChekEmail;
