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
  if (!message) return null;

  return (
    <div>
      <UncontrolledAlert color={color}>{message}</UncontrolledAlert>
    </div>
  );
};

export default Alert;
