import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUser } from '../../store/profile/actions';

class ProfileContainer extends React.Component<any> {
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

const mapStateToProps = (state: any): { user: any, loading: boolean } => {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
    };
};

export default connect(
    mapStateToProps,
    { getUser },
)(ProfileContainer);
