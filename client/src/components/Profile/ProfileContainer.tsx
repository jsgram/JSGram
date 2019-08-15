import React from 'react';
import { connect } from 'react-redux';
import Profile, {IUserData} from './Profile';
import { getUser } from '../../store/profile/actions';

interface IStateToProps {
    user: IUserData;
    loading: boolean;
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
                    loading={this.props.loading}
                    loaded={this.props.loaded}
                    getUser={this.props.getUser}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { user: any, loading: boolean, loaded: boolean } => ({
    user: state.profile.user,
    loading: state.profile.loading,
    loaded: state.profile.loaded,
});

const mapDispatchToProps = {
    getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
