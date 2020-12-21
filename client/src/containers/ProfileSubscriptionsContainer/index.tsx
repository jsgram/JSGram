import * as action from '../../store/profile/actions';
import { isValidSettings as validate } from '../../utils/validation';
import { renderField } from '../../components/CommonComponents/ReduxFormFields';
import { IUserPrivacy } from '../ProfilePrivacyContainer';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Button, Spinner, FormProps } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

export interface IUserSubscriptions {
    isNewsEmail: boolean;
    isReminderEmail: boolean;
    isProductEmail: boolean;
    isResearchEmail: boolean;
    isTextMessage: boolean;
}

const ProfileSubscriptionsContainer = ({
                                           username, privacy, changeSettings, handleSubmit, submitting,
                                       }: FormProps): JSX.Element => {
    const onSubmit = (data: string): void => {
        changeSettings(username, data, privacy);
    };
    return (
        <div>
            <h3 className='text-center font-weight-light text-secondary text-uppercase'>Subscribe to</h3>
            <Form className='d-flex flex-column mt-3 bg-white p-4' onSubmit={handleSubmit(onSubmit)}>
                <Label className='d-flex align-items-center'>
                    <Field
                        name='isNewsEmail'
                        type='checkbox'
                        className='position-static m-0 mr-2'
                        component={renderField}
                    />
                    News emails
                </Label>
                <div className='font-italic text-secondary mb-4'>
                    Find out JSgram repo news first.
                </div>

                <Label className='d-flex align-items-center'>
                    <Field
                        name='isReminderEmail'
                        type='checkbox'
                        className='position-static m-0 mr-2'
                        component={renderField}
                    />
                    Reminder emails
                </Label>
                <div className='font-italic text-secondary mb-4'>
                    Stay up to date with things you may have missed.
                </div>

                <Label className='d-flex align-items-center'>
                    <Field
                        name='isProductEmail'
                        type='checkbox'
                        className='position-static m-0 mr-2'
                        component={renderField}
                    />
                    Product emails
                </Label>
                <div className='font-italic text-secondary mb-4'>
                    Get update on JSgram's new features.
                </div>

                <Button
                    className='align-self-center btn mt-3'
                    color='danger'
                    disabled={submitting}
                >
                    <i className='fa fa-lock pr-3'/>
                    {submitting ? <Spinner color='light'/> : 'Change Subscriptions'}
                </Button>
            </Form>
        </div>
    );
};

export const mapStateToProps = (state: FormProps): {
    username: string,
    privacy: IUserPrivacy,
    initialValues: IUserSubscriptions,
} => ({
    username: state.profile.user.username,
    privacy: state.profile.user.privacy,
    initialValues: state.profile.user.subscriptions,
});

const mapDispatchToProps = {
    changeSettings: action.changeSettings,
};

const elementWrapper = reduxForm({
    form: 'changeSubscription',
    validate,
})(ProfileSubscriptionsContainer);

export default connect(mapStateToProps, mapDispatchToProps)(elementWrapper);
