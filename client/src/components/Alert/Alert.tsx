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
}) => {
  return (
    <div>
      {message && <UncontrolledAlert color={color} onClick={() => { clearAlert() }}>{message}</UncontrolledAlert>}
    </div>
  );
}

export default Alert;
