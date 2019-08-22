import React from 'react';
import { connect } from 'react-redux';
import { IUserData } from '../Profile/Profile';
import EmailChange from '../EmailChange/EmailChange';
import { changeEmail, setEmailText } from '../../store/emailChange/actions';

interface IStateToProps {
    user: IUserData;
}

class EmailChangeContainer extends React.Component <any> {

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

const mapStateToProps = (state: any): {email: string} => {
    return {
        email: state.changeEmail.email,
    };
};

const mapDispatchToProps = {
    setEmailText,
    changeEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailChangeContainer);
