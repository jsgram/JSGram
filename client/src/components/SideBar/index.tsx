import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Col, Row } from 'reactstrap';
import noAvatar from '../../assets/noAvatar.svg';
import { SidebarRoute } from '../../routes/SidebarRoute';
import Menu from '../Menu';
import './Sidebar.scss';

export interface IUserData {
    fullName: string;
    photo: string;
}

interface IFormProps {
    getUser: () => void;
    user: IUserData;
}

export default class Sidebar extends React.Component<IFormProps> {
    public componentDidMount(): void {
        this.props.getUser();
    }

    public render(): JSX.Element {
        const { user: { fullName, photo } }: any = this.props;
        return (
            <div>
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
            </div>
        );
    }

}
