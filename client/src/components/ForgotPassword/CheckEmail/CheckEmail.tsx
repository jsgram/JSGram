import React from "react";
import { Field } from "redux-form";
import { Spinner } from "reactstrap";
import { renderField } from "../../commonComponents/reduxFormFields";

class ChekEmail extends React.Component<any> {
  render() {
    const { handleSubmit, onSubmit, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="email"
            type="text"
            component={renderField}
            label="email"
          />
          <button disabled={submitting}>Check</button>
          {submitting && <Spinner color="dark" />}
        </form>
      </div>
    );
  }
}

export default ChekEmail;
