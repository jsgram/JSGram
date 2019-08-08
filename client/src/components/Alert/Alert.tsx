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
}) => (
  <div>
    {message && <UncontrolledAlert color={color}>{message}</UncontrolledAlert>}
  </div>
);

export default Alert;
