import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Col, Row, Spinner } from 'reactstrap';
import { SidebarRoute } from '../../routes/SidebarRoute';
import { deletePhoto, getUser } from '../../store/profile/actions';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';
import noAvatar from '../../assets/noAvatar.png';
import Menu from '../Menu';
import './style.scss';
import {IStateProfileEdit} from '../../store/profileEdit/reducers';
import { PopUpModal } from '../PopUp';

interface IStateToProps {
    user: IUser;
    loading: boolean;
}

interface IState {
    profile: IStateToProps;
    profileEdit: IStateProfileEdit;
}

interface ISideBarProps {
    user: IUser;
    urlUsername: string;
    loading: boolean;
    getUser: (username: string) => void;
    deletePhoto: () => void;
}

class SideBar extends React.Component<ISideBarProps> {
    public state: { loaded: boolean, modal: boolean } = {
        loaded: false,
        modal: false,
    };

    public componentDidMount(): void {
        this.props.getUser(this.props.urlUsername);
    }

    public toggleModal = (): void => {
        this.setState({modal: !this.state.modal});
    }

    public render(): JSX.Element {
        const {loggedUsername, user: {fullName, photo}, profileEdit: {newFullName}}: any = this.props;
        return (
            <Container>
                <div
                    className='row profile d-flex pt-2 justify-content-lg-center
                    justify-content-sm-around justify-content-center'>
                    <Menu/>
                </div>
                <Container>
                    <Row className='profile'>
                        <Col md='4' lg='3' className='mt-3'>
                            <div className='edit-content'>
                                <div className='d-flex justify-content-center'>
                                    {this.props.loading ?
                                        <Spinner
                                            style={{height: 150, width: 150}}
                                            type='grow'
                                            color='dark'
                                        />
                                        :
                                        <img
                                            src={photo || noAvatar}
                                            className='img-fluid w-50 rounded-circle avatar-img'
                                            alt='avatar'
                                            height={150}
                                            width={150}
                                            onClick={(): void => {
                                                this.toggleModal();
                                            }}
                                        />
                                    }
                                </div>
                                <div className='mt-2 text-center'>
                                    <div className='profile-usertitle-name'>
                                        {newFullName ? newFullName : fullName}
                                    </div>
                                    <div className='profile-title'>
                                        View Profile
                                    </div>
                                </div>
                                <Nav className='navbar'>
                                    <ul className='navbar-nav w-100'>
                                        <li className='nav-item'>
                                            <NavLink
                                                exact
                                                to={`/profile/${loggedUsername}/edit`}
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                <i className='fa fa-edit'></i>
                                                Edit Information
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink
                                                to={`/profile/${loggedUsername}/edit/change-email`}
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                <i className='fa fa-envelope'></i>
                                                Change Email
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink
                                                to={`/profile/${loggedUsername}/edit/change-password`}
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                <i className='fa fa-key'></i>
                                                Change Password
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink
                                                to={`/profile/${loggedUsername}/edit/subscriptions`}
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                <i className='fa fa-check-circle'></i>
                                                Subscribe To
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink
                                                to={`/profile/${loggedUsername}/edit/privacy`}
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                <i className='fa fa-user-secret'></i>
                                                Privacy and Security
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Nav>
                            </div>
                        </Col>
                        <Col md='8' lg='9' className='mt-3'>
                            <div className='edit-content'>
                                {SidebarRoute}
                            </div>
                        </Col>
                    </Row>
                </Container>
                {this.state.modal && <PopUpModal
                    modal={this.state.modal}
                    toggleModal={this.toggleModal}
                    loading={this.props.loading}
                    deletePhoto={this.props.deletePhoto}
                    photo={photo}
                />}
            </Container>
        );
    }
}

const mapStateToProps = (state: IState): { user: IUser, loading: boolean, profileEdit: IStateProfileEdit } => ({
    user: state.profile.user,
    loading: state.profile.loading,
    profileEdit: state.profileEdit,
});

const mapDispatchToProps = {
    getUser,
    deletePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
