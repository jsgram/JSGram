import React from "react";
import { connect } from "react-redux";
import { showAlert, clearAlert } from "../../store/alert/actions";
import Alert from "./Alert";

interface AlertProps {
  showAlert: Function;
  clearAlert: Function;
  message: string;
}

interface Alert {
  message: string;
}

interface AlertState {
  alert: Alert;
}

const AlertContainer: React.FunctionComponent<AlertProps> = ({
  showAlert,
  clearAlert,
  message
}) => {
  return (
    <div>
      <Alert showAlert={showAlert} clearAlert={clearAlert} message={message} />
    </div>
  );
};

const mapStateToProps = (state: AlertState) => {
  return { message: state.alert.message };
};

export default connect(
  mapStateToProps,
  { showAlert, clearAlert }
)(AlertContainer);
