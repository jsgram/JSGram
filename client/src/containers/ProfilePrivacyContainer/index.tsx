import * as action from '../../store/profile/actions';
import { isValidSettings as validate } from '../../utils/validation';
import { renderField } from '../../components/CommonComponents/ReduxFormFields';
import { IUserSubscriptions } from '../ProfileSubscriptionsContainer';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Button, Spinner, FormProps } from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';

export interface IUserPrivacy {
    isPrivateAccount: boolean;
    isActivityStatus: boolean;
    isStorySharing: boolean;
}

const ProfilePrivacyContainer = ({
                                     username, subscriptions, changeSettings, handleSubmit, submitting,
                                 }: FormProps): JSX.Element => {
    const onSubmit = (data: string): void => {
        changeSettings(username, subscriptions, data);
    };

    return (
        <div>
            <h3 className='text-center font-weight-light text-secondary text-uppercase'>Privacy and Security</h3>
            <Form className='d-flex flex-column mt-3 bg-white p-4' onSubmit={handleSubmit(onSubmit)}>
                <Label className='d-flex align-items-center'>
                    <Field
                        name='isPrivateAccount'
                        type='checkbox'
                        className='position-static m-0 mr-2 interaction'
                        component={renderField}
                    />
                    Private Account
                </Label>
                <p className='font-italic text-secondary mb-4'>
                    When your account is private, only people you approve
                    can see your photos and videos on JSgram.
                    Your existing followers won't be affected.
                </p>

                <Label className='d-flex align-items-center'>
                    <Field
                        name='isActivityStatus'
                        type='checkbox'
                        className='position-static m-0 mr-2 interaction'
                        component={renderField}
                    />
                    Show Activity Status
                </Label>
                <p className='font-italic text-secondary mb-4'>
                    Allow accounts you follow and anyone you message
                    to see when you were last active on JSgram apps.
                    When this is turned off, you won't be able to see
                    the activity status of other accounts.
                </p>

                <Label className='d-flex align-items-center'>
                    <Field
                        name='isStorySharing'
                        type='checkbox'
                        className='position-static m-0 mr-2 interaction'
                        component={renderField}
                    />
                    Photos of You
                </Label>
                <p className='font-italic text-secondary mb-4'>
                    Choose how you want photos of you added to your profile.
                </p>

                <Button
                    className='align-self-center btn mt-3 interaction'
                    color='danger'
                    disabled={submitting}
                >
                    <i className='fa fa-lock pr-3'/>
                    {submitting ? <Spinner color='light'/> : 'Change Privacy'}
                </Button>
            </Form>
        </div>
    );
};

export const mapStateToProps = (state: FormProps): {
    username: string,
    subscriptions: IUserSubscriptions,
    initialValues: IUserPrivacy,
    finalValues: IUserPrivacy,
} => ({
    username: state.profile.user.username,
    subscriptions: state.profile.user.subscriptions,
    initialValues: state.profile.user.privacy,
    finalValues: formValueSelector('changePrivacy')(state,
        'isPrivateAccount',
        'isActivityStatus',
        'isStorySharing',
    ),
});

const mapDispatchToProps = {
    changeSettings: action.changeSettings,
};

const elementWrapper = reduxForm({
    form: 'changePrivacy',
    validate,
})(ProfilePrivacyContainer);

export default connect(mapStateToProps, mapDispatchToProps)(elementWrapper);
