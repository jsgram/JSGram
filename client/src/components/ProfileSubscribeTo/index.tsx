import { changeSubscription } from '../../store/changeSettings/actions';
import { isValidSettings } from '../../utils/validation';

import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Input, FormProps } from 'reactstrap';

interface IStateToProps {
    settings: any;
}

class ProfileSubscribeTo extends React.Component<any> { // FIXME any type
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(event: any): any { // FIXME any type
        if (!isValidSettings(event)) {
            return;
        }
        this.props.changeSubscription(event);
    }

    public render(): JSX.Element {
        return (
            <div className='container ml-4 mr-4'>
                <h3 className='text-center font-weight-light text-secondary text-uppercase'>Subscribe to</h3>
                <Form className='d-flex flex-column mt-3 bg-white p-4' onChange={this.onSubmit}>
                    <Label className='d-flex align-items-center'>
                        <Input
                            name='newsEmails'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            checked={this.props.settings}
                        />
                        News emails
                    </Label>
                    <div className='font-italic text-secondary mb-4'>
                        Find out first about new products.
                    </div>

                    <Label className='d-flex align-items-center'>
                        <Input
                            name='reminderEmails'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            checked={this.props.settings}
                        />
                        Reminder emails
                    </Label>
                    <div className='font-italic text-secondary mb-4'>
                        Stay up to date with things you may have missed.
                    </div>

                    <Label className='d-flex align-items-center'>
                        <Input
                            name='productEmails'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            checked={this.props.settings}
                        />
                        Product emails
                    </Label>
                    <div className='font-italic text-secondary mb-4'>
                        Get tips on using Instagram's tools.
                    </div>

                    <Label className='d-flex align-items-center'>
                        <Input
                            name='researchEmails'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            checked={this.props.settings}
                        />
                        Research emails
                    </Label>
                    <div className='font-italic text-secondary mb-4'>
                        Provide feedback and participate in research studies.
                    </div>

                    <Label className='d-flex align-items-center'>
                        <Input
                            name='textMessages'
                            type='checkbox'
                            className='position-static m-0 mr-2'
                            checked={this.props.settings}
                        />
                        Text (SMS) Messages
                    </Label>
                    <div className='text-secondary mb-4'>
                        Get reminder notifications delivered by text message.
                    </div>
                </Form>
            </div>
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
