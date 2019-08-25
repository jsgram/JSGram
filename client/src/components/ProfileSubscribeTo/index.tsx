import { changeSubscription } from '../../store/changeSettings/actions';
import { isValidSettings } from '../../utils/validation';

import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Input, FormProps } from 'reactstrap';

interface IStateToProps {
    settings: any;
}

class ProfileSubscribeTo extends React.Component<any> { // FIXME
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
                <h3 className='font-weight-bold mb-4'>Subscribe to:</h3>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='newsEmails' checked={this.props.settings} />
                    News emails
                </Label>
                <div className='text-secondary mb-4'>Find out first about new products.</div>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='reminderEmails' checked={this.props.settings} />
                    Reminder emails
                </Label>
                <div className='text-secondary mb-4'>Stay up to date with things you may have missed.</div>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='productEmails' checked={this.props.settings} />
                    Product emails
                </Label>
                <div className='text-secondary mb-4'>Get tips on using Instagram's tools.</div>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='researchEmails' checked={this.props.settings} />
                    Research emails
                </Label>
                <div className='text-secondary mb-4'>Provide feedback and participate in research studies.</div>
                <Label className='font-weight-bold'>
                    <Input type='checkbox' name='textMessages' checked={this.props.settings} />
                    Text (SMS) Messages
                </Label>
                <div className='text-secondary mb-4'>Get reminder notifications delivered by text message.</div>
            </Form>
        );
    }
}

const mapStateToProps = (state: FormProps): IStateToProps => ({
    settings: state.profile.user.settings,
});

const mapDispatchToProps = {
    changeSubscription,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSubscribeTo);
