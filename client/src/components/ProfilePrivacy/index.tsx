import { changePrivacy } from '../../store/changeSettings/actions';
import { isValidSettings } from '../../utils/validation';

import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Input, FormProps } from 'reactstrap';

interface IStateToProps {
    settings: any;
}

class ProfilePrivacy extends React.Component<any> { // FIXME
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(event: any): any { // FIXME
        if (!isValidSettings(event)) return;
        this.props.changeSubscription(event);
    }

    public render(): JSX.Element {
        return (
            <Form className='container mt-4 bg-white text-left p-4' onChange={this.onSubmit}>
                <h3 className='font-weight-bold mb-4'>Account Privacy</h3>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='newsEmails' checked={this.props.settings} />
                    Private Account
                </Label>
                <p className='text-secondary mb-4'>
                    When your account is private, only people you approve can see your photos and videos on JSgram.
                    Your existing followers won't be affected.
                </p>

                <h3 className='font-weight-bold mb-4'>Activity Status</h3>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='reminderEmails' checked={this.props.settings} />
                    Show Activity Status
                </Label>
                <p className='text-secondary mb-4'>
                    Allow accounts you follow and anyone you message to see when you were last active on JSgram apps.
                    When this is turned off, you won't be able to see the activity status of other accounts.
                </p>

                <h3 className='font-weight-bold mb-4'>Story Sharing</h3>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='productEmails' checked={this.props.settings} />
                    Photos of You
                </Label>
                <p className='text-secondary mb-4'>
                    Choose how you want photos of you added to your profile.
                </p>

                <h3 className='font-weight-bold mb-4'>Comments</h3>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='researchEmails' checked={this.props.settings} />
                    Edit Comment Settings
                </Label>

                <h3 className='font-weight-bold mb-4'>Account Data</h3>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='textMessages' checked={this.props.settings} />
                    View Account Data
                </Label>

                <h3 className='font-weight-bold mb-4'>Data Download</h3>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='textMessages' checked={this.props.settings} />
                    Request Download
                </Label>
            </Form>
        );
    }
}

const mapStateToProps = (state: FormProps): IStateToProps => ({
    settings: state.profile.user.settings,
});

const mapDispatchToProps = {
    changePrivacy,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePrivacy);
