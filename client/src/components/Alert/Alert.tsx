import React from 'react';
import { connect } from 'react-redux';
import { clearAlert } from '../../store/alert/actions';
import { UncontrolledAlert } from 'reactstrap';

interface IAlertProps {
    message: string;
    color: string;
    clearAlert: any;
}

interface IAlert {
    message: string;
    color: string;
}

interface IAlertState {
    alert: IAlert;
}

const timer = (cleanAlert: () => void): void => {
    setTimeout(
        () => {
            cleanAlert();
        }, 5000);
};

const clear = (timerFunc: any): void => {
    clearTimeout(timerFunc);
};

const Alert: React.FunctionComponent<any> = ({
                                                 message,
                                                 color,
                                                 // tslint:disable-next-line:no-shadowed-variable
                                                 clearAlert,
                                             }: IAlertProps): any => message &&
    <UncontrolledAlert color={color} onClick={(): void => {
        clearAlert();
    }}>
        {message} {timer(clearAlert)} {clear(timer)}</UncontrolledAlert>;

const mapStateToProps = (state: IAlertState): { message: string, color: string } => ({
    message: state.alert.message,
    color: state.alert.color,
});

export default connect(
    mapStateToProps,
    {clearAlert},
)(Alert);
