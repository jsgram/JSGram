import { changePrivacy } from '../../store/changeSettings/actions';
import { isValidSettings } from '../../utils/validation';

import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Input, FormProps } from 'reactstrap';

import { Link } from 'react-router-dom';

interface IStateToProps {
    settings: any;
}

class ProfilePrivacy extends React.Component<any> { // FIXME
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(event: any): any { // FIXME
        if (!isValidSettings(event)) {
            return;
        }
        this.props.changeSubscription(event);
    }

    public render(): JSX.Element {
        return (
            <div className='container ml-4 mr-4'>
                <h3 className='text-center font-weight-light text-secondary text-uppercase'>Privacy and Security</h3>
                <Form className='container mt-4 bg-white text-left p-4' onChange={this.onSubmit}>
                    <Label className='d-flex align-items-center'>
                        <Input
                            name='privateAccount'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            checked={this.props.settings}
                        />
                        Private Account
                    </Label>
                    <p className='font-italic text-secondary mb-4'>
                        When your account is private, only people you approve
                        can see your photos and videos on JSgram.
                        Your existing followers won't be affected.
                    </p>

                    <Label className='d-flex align-items-center'>
                        <Input
                            name='showActivityStatus'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            checked={this.props.settings}
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
                        <Input
                            name='photosOfYou'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            checked={this.props.settings}
                        />
                        Photos of You
                    </Label>
                    <p className='font-italic text-secondary mb-4'>
                        Choose how you want photos of you added to your profile.
                    </p>

                    <Link className='align-self-center d-block text-danger pl-1 mt-3' to='#'>
                        Edit Comment Settings
                    </Link>

                    <Link className='align-self-center d-block text-danger pl-1 mt-3' to='#'>
                        View Account Data
                    </Link>

                    <Link className='align-self-center d-block text-danger pl-1 mt-3' to='#'>
                        Request Download
                    </Link>
                </Form>
            </div>
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
