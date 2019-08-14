import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUser } from '../../store/profile/actions';

interface IStateToProps {
    user: any;
    loading: boolean;
}

interface IDispatchToProps {
    getUser: () => void;
}

interface IState {
    profile: {
        user: any;
        loading: boolean;
    };
}

class ProfileContainer extends React.Component<IStateToProps & IDispatchToProps> {
    public render(): any {
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

const mapStateToProps = (state: IState): { user: any, loading: boolean } => {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
    };
};

const mapDispatchToProps = {
    getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
