import React from 'react';
import { connect } from 'react-redux';
import Profile, {IUserData} from './Profile';
import { getUser } from '../../store/profile/actions';

interface IStateToProps {
    user: IUserData;
    loading: boolean;
    timer: any;
}

interface IDispatchToProps {
    getUser: () => void;
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
                    getUser={this.props.getUser}
                    timer={this.props.timer}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { user: any, loading: boolean, timer: any } => ({
    user: state.profile.user,
    loading: state.profile.loading,
    timer: state.profile.timer,
});

const mapDispatchToProps = {
    getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
