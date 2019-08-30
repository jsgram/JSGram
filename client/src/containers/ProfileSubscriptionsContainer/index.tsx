import { changeSettings } from '../../store/profile/actions';
import { isValidSettings as validate } from '../../utils/validation';
import { renderField } from '../../components/CommonComponents/ReduxFormFields';
import { IUserPrivacy } from '../ProfilePrivacyContainer';

import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, FormProps } from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';

export interface IUserSubscriptions {
    isNewsEmail: boolean;
    isReminderEmail: boolean;
    isProductEmail: boolean;
    isResearchEmail: boolean;
    isTextMessage: boolean;
}

class ProfileSubscriptionsContainer extends React.Component<any> { // FIXME any type
    public componentWillUnmount(): void {
        const { username, privacy, initialValues, finalValues }: FormProps = this.props;

        if (JSON.stringify(initialValues) !== JSON.stringify(finalValues)) {
            this.props.changeSettings(username, finalValues, privacy);
        }
    }

    public render(): JSX.Element {
        return (
            <div className='container'>
                <h3 className='text-center font-weight-light text-secondary text-uppercase'>Subscribe to</h3>
                <Form className='d-flex flex-column mt-3 bg-white p-4'>
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
                        Find out first about new products.
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
                        Get tips on using Instagram's tools.
                    </div>

                    <Label className='d-flex align-items-center'>
                        <Field
                            name='isResearchEmail'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            component={renderField}
                        />
                        Research emails
                    </Label>
                    <div className='font-italic text-secondary mb-4'>
                        Provide feedback and participate in research studies.
                    </div>

                    <Label className='d-flex align-items-center'>
                        <Field
                            name='isTextMessage'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            component={renderField}
                        />
                        Text (SMS) Messages
                    </Label>
                    <div className='font-italic text-secondary mb-4'>
                        Get reminder notifications delivered by text message.
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: FormProps): {
    username: string,
    privacy: IUserPrivacy,
    initialValues: IUserSubscriptions,
    finalValues: IUserSubscriptions,
} => ({
    username: state.profile.user.username,
    privacy: state.profile.user.privacy,
    initialValues: state.profile.user.subscriptions,
    finalValues: formValueSelector('changeSubscription')(state,
        'isNewsEmail',
        'isReminderEmail',
        'isProductEmail',
        'isResearchEmail',
        'isTextMessage',
    ),
});

const mapDispatchToProps = {
    changeSettings,
};

const elementWrapper = reduxForm({
    form: 'changeSubscription',
    validate,
})(ProfileSubscriptionsContainer);

export default connect(mapStateToProps, mapDispatchToProps)(elementWrapper);
