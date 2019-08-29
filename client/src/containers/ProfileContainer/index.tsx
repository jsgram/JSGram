import React from 'react';
import { connect } from 'react-redux';
import Profile, { IUserData } from '../../components/Profile';
import { getUser, deletePhoto } from '../../store/profile/actions';

interface IStateToProps {
    user: IUserData;
    loaded: boolean;
    loading: boolean;
}

interface IState {
    profile: IStateToProps;
}

export class ProfileContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <div className='container'>
                <Profile
                    user={this.props.user}
                    loaded={this.props.loaded}
                    loading={this.props.loading}
                    getUser={this.props.getUser}
                    deletePhoto={this.props.deletePhoto}
                    addLike={this.props}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { user: any, loaded: boolean, loading: boolean } => ({
    user: state.profile.user,
    loaded: state.profile.loaded,
    loading: state.profile.loading,
});

const mapDispatchToProps = {
    getUser,
    deletePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
