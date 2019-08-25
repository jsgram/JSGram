import React from 'react';
import { connect } from 'react-redux';
import ProfileEdit from '../../components/ProfileEdit';
import { reduxForm } from 'redux-form';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';
import { editProfile } from '../../store/profileEdit/actions';
import { IUserData } from '../../components/Profile';

interface IStateToProps {
    user: IUserData;
}

interface IState {
    profile: IStateToProps;
}

class ProfileEditContainer extends React.Component <any> {

    constructor(props: any) {
        super(props);
        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    public onChangeProfile(user: IUser): IUser {
        return this.props.editProfile(user);
    }

    public onChangeEmail(email: string): any {
        return this.props.changeEmail(email);
    }

    public render(): JSX.Element {
        const {handleSubmit, submitting}: FormProps = this.props;
        return (
            <div className='container'>
                <ProfileEdit
                    handleSubmit={handleSubmit}
                    onChangeProfile={this.onChangeProfile}
                    submitting={submitting}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { initialValues: any } => ({
    initialValues: state.profile.user,
});

const mapDispatchToProps = {
    editProfile,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'profileEditForm',
        validate,
        enableReinitialize: true,
    })(ProfileEditContainer),
);
