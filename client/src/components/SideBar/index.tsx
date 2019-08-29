import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Col, Row } from 'reactstrap';
import { SidebarRoute } from '../../routes/SidebarRoute';
import { getUser } from '../../store/profile/actions';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';
import noAvatar from '../../assets/noAvatar.svg';
import Menu from '../Menu';
import './SideBar.scss';

interface IStateToProps {
    user: IUser;
}

interface IState {
    profile: IStateToProps;
}

class SideBar extends React.Component<any> {
    public componentDidMount(): void {
        this.props.getUser();
    }

    public render(): JSX.Element {
        const { user: { fullName, photo } }: any = this.props;
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
                                    <img
                                        src={photo || noAvatar}
                                        className='img-fluid w-50'
                                        alt='avatar'
                                        height={150}
                                        width={150}
                                    />
                                </div>
                                <div className='mt-2 text-center'>
                                    <div className='profile-usertitle-name'>
                                        {fullName}
                                    </div>
                                    <div className='profile-title'>
                                        Edit Profile
                                    </div>
                                </div>
                                <Nav className='navbar'>
                                    <ul className='navbar-nav w-100'>
                                        <li className='nav-item'>
                                            <NavLink
                                                exact
                                                to='/profile/edit'
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                    <i className='fa fa-edit'></i>
                                                    Edit Information
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink
                                                to='/profile/edit/change-email'
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                    <i className='fa fa-envelope'></i>
                                                    Change Email
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink
                                                to='/profile/edit/change-password'
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                    <i className='fa fa-key'></i>
                                                    Change Password
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink
                                                to='/profile/edit/subscribe-to'
                                                activeClassName='active'
                                                className='nav-link pl-2'>
                                                    <i className='fa fa-check-circle'></i>
                                                    Subscribe To
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink
                                                to='/profile/edit/privacy'
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
            </Container>
        );
    }

}

const mapStateToProps = (state: IState): { user: IUser } => ({
    user: state.profile.user,
});

const mapDispatchToProps = {
    getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
