import React, { ReactElement } from 'react';
import { UncontrolledAlert } from 'reactstrap';

interface IAlertProps {
    cleanAlert: any;
    message: string;
    color: string;
}

const Alert: React.FunctionComponent<IAlertProps> = ({
  cleanAlert,
  message,
  color,
}: {cleanAlert: () => void, message: string, color: string}): any => message &&
    <UncontrolledAlert color={color} onClick={(): void => { cleanAlert(); }}>{message}</UncontrolledAlert>;

export default Alert;
