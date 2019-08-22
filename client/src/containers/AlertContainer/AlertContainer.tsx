import React from 'react';
import * as actions from '../../store/alert/actions';
import Index from '../../components/Alert';
import { connect } from 'react-redux';
import { FormProps } from 'reactstrap';

const AlertContainer: React.FunctionComponent<FormProps> = ({
                                                          message,
                                                          color,
                                                          clearAlert,
                                                      }: FormProps): JSX.Element | null => !!message ? (
    <Index clearAlert={clearAlert} message={message} color={color}/>
) : null;

const mapStateToProps = (state: FormProps): { message: string, color: string } => ({
    message: state.alert.message,
    color: state.alert.color,
});

export default connect(
    mapStateToProps,
    {clearAlert: actions.clearAlert},
)(AlertContainer);
