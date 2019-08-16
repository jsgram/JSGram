import React from 'react';
import { connect } from 'react-redux';
import { clearAlert } from '../../store/alert/actions';
import { UncontrolledAlert } from 'reactstrap';

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

const Alert: React.FunctionComponent<any> = ({
  message,
  color,
  cleanAlert,
}: IAlertProps): any => message &&
    <UncontrolledAlert color={color} onClick={(): void => {cleanAlert(); }}>{message}</UncontrolledAlert>;

const mapStateToProps = (state: IAlertState): {message: string, color: string} => ({
    message: state.alert.message,
    color: state.alert.color,
});

export default connect(
  mapStateToProps,
  { clearAlert },
)(Alert);
