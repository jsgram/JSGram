import React from 'react';
import { connect } from 'react-redux';
import { ProfileEdit } from '../../components/ProfileEdit';
import { reduxForm } from 'redux-form';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';
import { editProfile } from '../../store/profileEdit/actions';
import { IUserData } from '../../components/Profile';
import { IStateProfileEdit } from '../../store/profileEdit/reducers';
import { history } from '../../history';

interface IStateToProps {
    user: IUserData;
}

interface IFeedState {
    username: string;
    loading: boolean;
}

interface IState {
    profile: IStateToProps;
    profileEdit: IStateProfileEdit;
    feed: IFeedState;
}

export class ProfileEditContainer extends React.Component <any> {
    public componentDidUpdate(): void {
        if (this.props.username && this.props.username !== this.props.match.params.username) {
            history.push(`/profile/${this.props.username}`);
        }
    }

    public onChangeProfile = (user: IUser): void => this.props.editProfile(user);

    public render(): JSX.Element {
        const {handleSubmit, submitting}: FormProps = this.props;
        return (
            <ProfileEdit
                handleSubmit={handleSubmit}
                submitting={submitting}
                onChangeProfile={this.onChangeProfile}
            />
        );
    }
}

const mapStateToProps = (state: IState): { initialValues: IUserData, loading: boolean } => ({
    initialValues: state.profile.user,
    loading: state.feed.loading,
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
