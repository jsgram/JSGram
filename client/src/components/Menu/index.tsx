import React from 'react';
import logo from '../../assets/logo.png';
import {
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Dropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { IStateProfileEdit } from '../../store/profileEdit/reducers';
import noAvatar from '../../assets/noAvatar.png';

const users = [
    {
        id: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz5FG9tU' +
            'w40WJMHOTvhYmJqXhu0mAOjjP_4dzS7Z3bULrLICZL', username: 'volodiarevura', fullname: 'Volodia Revura',
    },
    {id: 2, image: noAvatar, username: 'didOstap', fullname: 'Ostap Dribniuk'},
    {id: 3, image: noAvatar, username: 'artem25', fullname: 'Artem Pavliuk'},
    {id: 4, image: noAvatar, username: 'yuriimartinenko', fullname: 'Yurii Martinenko'},
    {id: 5, image: noAvatar, username: 'oleksiydorozhkin', fullname: 'Oleksiy Dorozhkin'},
    {id: 6, image: noAvatar, username: 'rostyslav', fullname: 'Rostyslva Khanas'},
    {id: 7, image: noAvatar, username: 'ihorkalyta', fullname: 'Ihor Kalyta'},
    {id: 8, image: noAvatar, username: 'marianna', fullname: 'Marianna Petrivska'},
]

interface IUsers {
    id: number;
    image: string;
    username: string;
    fullname: string;
}

interface IStateFeed {
    loggedUsername: string;
}

interface IState {
    profileEdit: IStateProfileEdit;
    feed: IStateFeed;
}

interface IMenuProps {
    loggedUsername: string;
    newUsername: string;
}

interface IUserMenuOpen {
    isMenuOpen: boolean;
}

class Menu extends React.Component<IMenuProps> {
    public state: IUserMenuOpen = {
        isMenuOpen: false,
    };

    public toggle = (e: any): void => {
        this.setState({
            isMenuOpen: e.target.value.trim() !== '',
        });
    }

    public render(): JSX.Element {
        const {loggedUsername, newUsername}: IMenuProps = this.props;
        return (
            <div className='container-fluid header-menu'>
                <div className='row justify-content-between bg-white'>
                    <Link to='/'>
                        <img src={logo}
                             alt='logo'
                             width={110}
                             className='mb-3 sm-mb-2 sm-mr-5 pt-1 logo'/>
                    </Link>
                    <div className='col-sm-4 col-4 mt-4 form-group search'>
                        <span className='fa fa-search form-control-feedback'/>
                        <Input
                            placeholder='Search'
                            type='search'
                            className='form-control px-4'
                            onChange={this.toggle}
                        />
                        <Dropdown isOpen={this.state.isMenuOpen} color='light' className='search-menu'>
                            <DropdownToggle tag='a' className='nav-link m-0 p-0'/>
                            <DropdownMenu className='scrollable-menu col-12'>
                                {users.map((user: IUsers) => (
                                        <Link to={`/profile/feed`} className='text-decoration-none'>
                                            <div className='w-100'>
                                                <DropdownItem key={user.id} className='p-md-2 p-1'>
                                                    <img
                                                        src={user.image}
                                                        width={32}
                                                        height={32}
                                                        className='rounded-circle mr-2'
                                                        alt='avatar'
                                                    />
                                                    <span className='font-weight-bold'>{user.username}<br/></span>
                                                    <span className='ml-4 pl-3 fullname'>
                                                    {user.fullname}
                                                </span>
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                            </div>
                                        </Link>
                                    ),
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='mt-4'>
                        <i className='fa fa-compass fa-lg pt-2 pb-2 pr-4 sm-pt-0 icon text-muted'/>
                        <i className='fa fa-heart-o fa-lg pr-4 icon text-muted'/>
                        <Link to={`/profile/${newUsername ? newUsername : loggedUsername}`}>
                            <i className='fa fa-user-o fa-lg pr-3 icon'/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { newUsername: string, loggedUsername: string } => ({
    newUsername: state.profileEdit.newUsername,
    loggedUsername: state.feed.loggedUsername,
});

export default connect(mapStateToProps, null)(Menu);
