import React from 'react';
import { connect } from 'react-redux';
import Profile, {IUserData} from './Profile';
import { getUser } from '../../store/profile/actions';

interface IStateToProps {
    user: IUserData;
    loading: boolean;
}

interface IDispatchToProps {
    getUser: () => void;
}

interface IState {
    profile: IStateToProps;
}

class ProfileContainer extends React.Component<IStateToProps & IDispatchToProps> {
    public render(): JSX.Element {
        return (
            <div className='container'>
                <Profile
                    user={this.props.user}
                    loading={this.props.loading}
                    getUser={this.props.getUser}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { user: any, loading: boolean } => ({
    user: state.profile.user,
    loading: state.profile.loading,
});

const mapDispatchToProps = {
    getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
