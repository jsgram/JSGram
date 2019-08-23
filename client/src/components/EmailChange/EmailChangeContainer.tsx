import React from 'react';
import { connect } from 'react-redux';
import EmailChange from '../EmailChange/EmailChange';
import { changeEmail, setEmailText } from '../../store/emailChange/actions';

interface IStateToProps {
    setEmailText: any;
    email: string;
    changeEmail: any;
}

class EmailChangeContainer extends React.Component <IStateToProps> {

    public render(): JSX.Element {
        return (
            <div className='container'>
                <EmailChange
                    setEmailText={this.props.setEmailText}
                    email={this.props.email}
                    changeEmail={this.props.changeEmail}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: any): {email: string} => ({
    email: state.changeEmail.email,
});

const mapDispatchToProps = {
    setEmailText,
    changeEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailChangeContainer);
