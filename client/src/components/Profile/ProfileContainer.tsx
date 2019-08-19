import React from 'react';
import { connect } from 'react-redux';
import Profile, {IUserData} from './Profile';
import { getUser, deletePhoto } from '../../store/profile/actions';

interface IStateToProps {
    user: IUserData;
    loaded: boolean;
}

interface IState {
    profile: IStateToProps;
}

class ProfileContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <div className='container'>
                <Profile
                    user={this.props.user}
                    loaded={this.props.loaded}
                    getUser={this.props.getUser}
                    deletePhoto={this.props.deletePhoto}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { user: any, loaded: boolean } => ({
    user: state.profile.user,
    loaded: state.profile.loaded,
});

const mapDispatchToProps = {
    getUser,
    deletePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
