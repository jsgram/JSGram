import React from 'react';
import { connect } from 'react-redux';
import ProfileEdit from '../../components/ProfileEdit';
import { reduxForm } from 'redux-form';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';
import { editProfile } from '../../store/profileEdit/actions';
import { IUserData } from '../../components/Profile';
import { IStateProfileEdit } from '../../store/profileEdit/reducers';
import { getUserInfoFromToken } from '../../store/feed/actions';
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

class ProfileEditContainer extends React.Component <any> {

    constructor(props: any) {
        super(props);
        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    public componentDidMount(): void {
        this.props.getUserInfoFromToken();
    }

    public componentDidUpdate(): void {
        if (this.props.username && this.props.username !== this.props.match.params.username) {
            history.push(`/profile/${this.props.username}`);
        }
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
            <ProfileEdit
                handleSubmit={handleSubmit}
                submitting={submitting}
                onChangeProfile={this.onChangeProfile}
            />
        );
    }
}

const mapStateToProps = (state: IState): { initialValues: any, username: string, loading: boolean } => ({
    initialValues: state.profile.user,
    username: state.feed.username,
    loading: state.feed.loading,
});

const mapDispatchToProps = {
    editProfile,
    getUserInfoFromToken,
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
