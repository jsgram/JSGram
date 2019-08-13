import React from "react";
import { UncontrolledAlert } from "reactstrap";

interface AlertProps {
  clearAlert: Function;
  message: string;
  color: string;
}

const Alert: React.FunctionComponent<AlertProps> = ({
  clearAlert,
  message,
  color
}) => message ? <UncontrolledAlert color={color} onClick={() => { clearAlert() }}>{message}</UncontrolledAlert> : null

export default Alert;
