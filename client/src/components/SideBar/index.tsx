import React from 'react';
import { Container, Nav, Col, Row } from 'reactstrap';
import './SideBar.scss';
import noAvatar from '../../assets/noAvatar.svg';
import { NavLink } from 'react-router-dom';
import { SidebarRoute } from '../../routes/SidebarRoute';
import Menu from '../Menu';

export interface IUserData {
    fullName: string;
    photo: string;
}

interface IFormProps {
    getUser: () => void;
    user: IUserData;
}

export default class SideBar extends React.Component<IFormProps> {
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
                    <Row className="profile">
                        <Col md='4' lg='3'>
                            <div className="profile-sidebar">
                                <div className="profile-userpic">
                                    <img
                                        src={photo || noAvatar}
                                        className='img-fluid'
                                        alt='avatar'
                                        height={150}
                                        width={150}
                                    />
                                </div>
                                <div className="profile-usertitle">
                                    <div className="profile-usertitle-name">
                                        {fullName}
                                    </div>
                                    <div className="profile-usertitle-job">
                                        Edit Profile
                                    </div>
                                </div>
                                <Nav className="navbar">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <NavLink 
                                            exact 
                                            to='/profile/edit' 
                                            activeClassName="active" 
                                            className="nav-link">
                                                <i className="fa fa-edit"></i>
                                                Edit Information 
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink 
                                            to='/profile/edit/change-email' 
                                            activeClassName="active" 
                                            className="nav-link">
                                                <i className="fa fa-envelope"></i>
                                                Change Email 
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink 
                                            to='/profile/edit/change-password' 
                                            activeClassName="active" 
                                            className="nav-link">
                                                <i className="fa fa-key"></i>
                                                Change Password 
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Nav>
                            </div>
                        </Col>
                        <Col md='8'>
                            <div className="profile-content">
                                {SidebarRoute}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>);
    }

}
