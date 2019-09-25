import React from 'react';
import logo from '../../assets/logo.png';
import {
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import './style.scss';
import { connect } from 'react-redux';
import { IStateProfileEdit } from '../../store/profileEdit/reducers';
import noAvatar from '../../assets/noAvatar.png';
import {
    clearSearchResults,
    getSearchResults,
    addNextResults,
} from '../../store/search/actions';

export interface IUser {
    _id: string;
    username: string;
    photoPath: string;
    fullName: string;
}

interface IStateFeed {
    loggedUsername: string;
}

interface IState {
    profileEdit: IStateProfileEdit;
    feed: IStateFeed;
    search: any;
}

interface IMenuProps {
    loggedUsername: string;
    newUsername: string;
    searchResults: IUser[];
    page: number;
    loaded: boolean;
    getSearchResults: (searchQuery: string, page: number) => void;
    clearSearchResults: () => void;
    addNextResults: (page: number) => void;
}

interface IProps {
    newUsername: string;
    loggedUsername: string;
    searchResults: IUser[];
    loaded: boolean;
    page: number;
}

interface IMenuState {
    isMenuOpen: boolean;
    searchValue: string;
}

class Menu extends React.Component<IMenuProps> {
    public state: IMenuState = {
        isMenuOpen: false,
        searchValue: '',
    };
    public timer: any;

    public toggle = (searchQuery: string): void => {
        this.setState({
            isMenuOpen: searchQuery !== '',
        });
    }

    public componentWillUnmount = (): void => {
        clearTimeout(this.timer);
        this.props.clearSearchResults();
        this.setState({searchValue: ''});
    }

    public getMoreResults = async (): Promise<void> => {
        await this.props.addNextResults(this.props.page + 1);
        this.props.getSearchResults(this.state.searchValue.trim(), this.props.page);
    }

    public onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        clearTimeout(this.timer);
        this.setState({searchValue: e.target.value});

        const FIRST_PAGE = 1;
        const searchQuery: string = e.target.value.trim();

        if (searchQuery) {
            this.timer = setTimeout(async () => {
                this.timer = null;
                await this.props.getSearchResults(searchQuery, FIRST_PAGE);
                this.toggle(searchQuery);
            }, 500);
        } else {
            this.props.clearSearchResults();
            this.toggle(searchQuery);
        }
    }

    public render(): JSX.Element {
        const {loggedUsername, newUsername, searchResults, loaded}: IMenuProps = this.props;
        const {searchValue}: IMenuState = this.state;
        return (
            <div className='container-fluid header-menu'>
                <div className='row justify-content-between bg-white'>
                    <Link to='/'>
                        <img src={logo}
                             alt='logo'
                             width={110}
                             className='mb-3 sm-mb-2 sm-mr-5 pt-1 logo'/>
                    </Link>
                    <div className='col-md-4 mt-md-4 mt-0 form-group search'>
                        <span className='fa fa-search form-control-feedback'/>
                        <Input
                            placeholder='Search'
                            type='search'
                            className='form-control px-4'
                            value={searchValue}
                            onChange={this.onSearchChange}
                        />
                        <Dropdown isOpen={this.state.isMenuOpen}
                                  toggle={(): void => {this.toggle(searchValue); }}
                                  color='light' className='search-menu'>
                            <DropdownToggle tag='a' className='nav-link m-0 p-0'/>
                            <DropdownMenu className='scrollable-menu col-12'>
                                {!!searchResults.length ? searchResults.map((user: IUser) => (
                                        <Link to={`/profile/${user.username}`}
                                              className='text-decoration-none' key={user._id}>
                                            <div className='w-100'>
                                                <DropdownItem className='p-md-2 p-1'>
                                                    <img
                                                        src={user.photoPath || noAvatar}
                                                        width={32}
                                                        height={32}
                                                        className='rounded-circle mr-2'
                                                        alt='avatar'
                                                    />
                                                    <span className='font-weight-bold'>{user.username}<br/></span>
                                                    <span className='ml-4 pl-3 fullname'>
                                                    {user.fullName}
                                                </span>
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                            </div>
                                        </Link>
                                    ),
                                ) : <span className='ml-3'>No results...</span>}
                                {!!searchResults.length && !loaded &&
                                <Waypoint
                                    onEnter={(): void => {
                                        this.getMoreResults();
                                    }}
                                />}
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

const mapStateToProps = (state: IState): IProps => ({
    newUsername: state.profileEdit.newUsername,
    loggedUsername: state.feed.loggedUsername,
    searchResults: state.search.searchResults,
    loaded: state.search.loaded,
    page: state.search.page,
});

const mapDispatchToProps = {
    clearSearchResults,
    getSearchResults,
    addNextResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
