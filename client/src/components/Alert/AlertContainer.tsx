import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { clearAlert } from '../../store/alert/actions';
import Alert from './Alert';

interface IAlertProps {
    message: string;
    color: string;
    cleanAlert: any;
}

interface IAlert {
    message: string;
    color: string;
}

interface IAlertState {
    alert: IAlert;
}

const AlertContainer: React.FunctionComponent<any> = ({
  message,
  color,
  cleanAlert,
}: IAlertProps): ReactElement | null => <Alert cleanAlert={cleanAlert} message={message} color={color} />;

const mapStateToProps = (state: IAlertState): {message: string, color: string} => ({
    message: state.alert.message,
    color: state.alert.color,
});

export default connect(
  mapStateToProps,
  { clearAlert },
)(AlertContainer);
