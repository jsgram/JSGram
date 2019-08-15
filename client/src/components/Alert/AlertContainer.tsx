import React from 'react';
import * as actions from '../../store/alert/actions';
import Alert from './Alert';
import { connect } from 'react-redux';

const AlertContainer: React.FunctionComponent<any> = ({
                                                          message,
                                                          color,
                                                          clearAlert,
                                                      }: any): JSX.Element | null => !!message ? (
    <Alert clearAlert={clearAlert} message={message} color={color}/>
) : null;

const mapStateToProps = (state: any): { message: string, color: string } => ({
    message: state.alert.message,
    color: state.alert.color,
});

export default connect(
    mapStateToProps,
    {clearAlert: actions.clearAlert},
)(AlertContainer);
