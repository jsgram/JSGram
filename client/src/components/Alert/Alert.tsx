import React, { ReactElement } from 'react';
import { UncontrolledAlert } from 'reactstrap';

interface IAlertProps {
    clearAlert: any;
    message: string;
    color: string;
}

const Alert: React.FunctionComponent<IAlertProps> = ({
  clearAlert,
  message,
  color,
}: {clearAlert: () => void, message: string, color: string}): ReactElement | null => message ?
    <UncontrolledAlert color={color} onClick={(): void => { clearAlert(); }}>{message}</UncontrolledAlert> : null;

export default Alert;
