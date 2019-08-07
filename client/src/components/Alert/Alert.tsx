import React from "react";

interface AlertProps {
  showAlert: Function;
  clearAlert: Function;
  message: string;
}

const Alert: React.FunctionComponent<AlertProps> = ({
  showAlert,
  clearAlert,
  message
}) => {
  return (
    <div>
      <div>{message}</div>
    </div>
  );
};

export default Alert;
