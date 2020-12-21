import React from 'react';
import * as actions from '../../store/alert/actions';
import Alert from '../../components/Alert';
import { connect } from 'react-redux';
import { FormProps } from 'reactstrap';

export const AlertContainer: React.FunctionComponent<FormProps> = ({
                                                          message,
                                                          color,
                                                          clearAlert,
                                                      }: FormProps): JSX.Element | null => !!message ? (
    <Alert clearAlert={clearAlert} message={message} color={color}/>
) : null;

const mapStateToProps = (state: FormProps): { message: string, color: string } => ({
    message: state.alert.message,
    color: state.alert.color,
});

export default connect(
    mapStateToProps,
    {clearAlert: actions.clearAlert},
)(AlertContainer);
