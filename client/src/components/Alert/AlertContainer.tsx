import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { clearAlert } from '../../store/alert/actions';
import Alert from './Alert';

interface IAlertProps {
    clearAlert: () => void;
    message: string;
    color: string;
}

interface IAlert {
    message: string;
    color: string;
}

interface IAlertState {
    alert: IAlert;
}

const AlertContainer: React.FunctionComponent<IAlertProps> = ({
  message,
  color,
                                                                  // tslint:disable-next-line:no-shadowed-variable
  clearAlert,
}: IAlertProps): ReactElement | null => <Alert clearAlert={clearAlert} message={message} color={color} />;

const mapStateToProps = (state: IAlertState): {message: string, color: string} => ({
    message: state.alert.message,
    color: state.alert.color,
});

export default connect(
  mapStateToProps,
  { clearAlert },
)(AlertContainer);
