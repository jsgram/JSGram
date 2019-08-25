import React from 'react';
import { connect } from 'react-redux';
import Sidebar, { IUserData } from '../../components/Sidebar';
import { getUser } from '../../store/profile/actions';

interface IStateToProps {
    user: IUserData;
}

interface IState {
    profile: IStateToProps;
}

class SidebarContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <div className='container'>
                <Sidebar
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
