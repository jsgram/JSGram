import { changeSettings } from '../../store/profile/actions';
import { isValidSettings as validate } from '../../utils/validation';
import { renderField } from '../../components/CommonComponents/ReduxFormFields';
import { IUserSubscriptions } from '../ProfileSubscriptionsContainer';

import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Button, Spinner, FormProps } from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { Link } from 'react-router-dom';

export interface IUserPrivacy {
    isPrivateAccount: boolean;
    isActivityStatus: boolean;
    isStorySharing: boolean;
}

class ProfilePrivacyContainer extends React.Component<any> { // FIXME any type
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(data: any): any { // FIXME any type
        const { username, subscriptions }: FormProps = this.props;

        return this.props.changeSettings(username, subscriptions, data);
    }

    public render(): JSX.Element {
        const { handleSubmit, submitting }: FormProps = this.props;
        return (
            <div>
                <h3 className='text-center font-weight-light text-secondary text-uppercase'>Privacy and Security</h3>
                <Form className='d-flex flex-column mt-3 bg-white p-4' onSubmit={handleSubmit(this.onSubmit)}>
                    <Label className='d-flex align-items-center'>
                        <Field
                            name='isPrivateAccount'
                            type='checkbox'
                            className='position-static m-0 mr-2'
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
                            className='position-static m-0 mr-2'
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
                            className='position-static m-0 mr-2'
                            component={renderField}
                        />
                        Photos of You
                    </Label>
                    <p className='font-italic text-secondary mb-4'>
                        Choose how you want photos of you added to your profile.
                    </p>

                    <Link className='d-block text-danger pl-1 mt-3' to='#'>
                        Edit Comment Settings
                    </Link>

                    <Link className='d-block text-danger pl-1 mt-3' to='#'>
                        View Account Data
                    </Link>

                    <Link className='d-block text-danger pl-1 mt-3' to='#'>
                        Request Download
                    </Link>

                    <Button
                        className='align-self-center btn mt-3'
                        color='danger'
                        disabled={submitting}
                    >
                        <i className='fa fa-lock pr-3' />
                        {submitting ? <Spinner color='light' /> : 'Change Privacy'}
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: FormProps): {
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
    changeSettings,
};

const elementWrapper = reduxForm({
    form: 'changePrivacy',
    validate,
})(ProfilePrivacyContainer);

export default connect(mapStateToProps, mapDispatchToProps)(elementWrapper);
