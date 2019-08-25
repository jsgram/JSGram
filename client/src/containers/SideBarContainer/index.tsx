import React from 'react';
import { connect } from 'react-redux';
import SideBar, { IUserData } from '../../components/SideBar';
import { getUser } from '../../store/profile/actions';

interface IStateToProps {
    user: IUserData;
}

interface IState {
    profile: IStateToProps;
}

class SideBarContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <div className='container'>
                <SideBar
                    user={this.props.user}
                    getUser={this.props.getUser}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { user: any } => ({
    user: state.profile.user,
});

const mapDispatchToProps = {
    getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
