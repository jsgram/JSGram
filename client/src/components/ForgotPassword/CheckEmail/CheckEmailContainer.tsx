import React from "react";
import CheckEmail from "./CheckEmail";
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect } from "react-redux";
import { checkEmail } from "../../../store/checkEmail/actions";
import validate from '../../../utils/validation'

class CheckEmailContainer extends React.Component<any> {
  onSubmit = (email: string) => {
    return this.props.checkEmail(email);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <CheckEmail
        handleSubmit={handleSubmit}
        onSubmit={this.onSubmit}
        submitting={submitting}
      />
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
