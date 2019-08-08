import React from "react";
import { connect } from "react-redux";
import { clearAlert } from "../../store/alert/actions";
import Alert from "./Alert";

interface AlertProps {
  clearAlert: Function;
  message: string;
  color: string;
}

interface Alert {
  message: string;
  color: string;
}

interface AlertState {
  alert: Alert;
}

const AlertContainer: React.FunctionComponent<AlertProps> = ({
  message,
  color,
  clearAlert
}) => <Alert clearAlert={clearAlert} message={message} color={color} />;

const mapStateToProps = (state: AlertState) => ({
  message: state.alert.message,
  color: state.alert.color
});

export default connect(
  mapStateToProps,
  { clearAlert }
)(AlertContainer);
