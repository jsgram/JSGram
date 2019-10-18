import React from 'react';
import logo from '../../assets/logo.png';
import {
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import './style.scss';
import { connect } from 'react-redux';
import { IStateProfileEdit } from '../../store/profileEdit/reducers';
import { ISearchState } from '../../store/search/reducers';
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

interface IHashTag {
    _id: string;
    tagName: string;
    posts: string[];
}

interface IStateFeed {
    loggedUsername: string;
}

interface IState {
    profileEdit: IStateProfileEdit;
    feed: IStateFeed;
    search: ISearchState;
}

interface IMenuProps {
    loggedUsername: string;
    newUsername: string;
    searchResults: IUser[];
    page: number;
    loaded: boolean;
    loading: boolean;
    getSearchResults: (searchQuery: string, page: number) => void;
    clearSearchResults: () => void;
    addNextResults: (page: number) => void;
}

interface IProps {
    newUsername: string;
    loggedUsername: string;
    searchResults: IUser[];
    loaded: boolean;
    loading: boolean;
    page: number;
}

interface IMenuState {
    isMenuOpen: boolean;
    searchValue: string;
}

export class Menu extends React.Component<IMenuProps> {
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

    public getMoreResults = (): void => {
        this.props.addNextResults(this.props.page + 1);
        this.props.getSearchResults(this.state.searchValue.trim(), this.props.page);
    }

    public onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        clearTimeout(this.timer);
        this.setState({searchValue: e.target.value});

        const FIRST_PAGE = 1;
        const searchQuery: string = e.target.value.trim();

        if (searchQuery && searchQuery !== '#') {
            this.timer = setTimeout(() => {
                this.timer = null;
                this.props.getSearchResults(searchQuery, FIRST_PAGE);
                this.toggle(searchQuery);
            }, 500);
        } else if (!searchQuery) {
            this.props.clearSearchResults();
            this.toggle(searchQuery);
        }
    }

    public renderUser = (user: IUser): JSX.Element => (
        <Link to={`/profile/${user.username}`}
              className='text-decoration-none interaction' key={user._id}>
            <div className='w-100'>
                <DropdownItem className='p-md-2 p-1 d-flex align-items-center'>
                    <img
                        src={user.photoPath || noAvatar}
                        width={32}
                        height={32}
                        className='rounded-circle mr-2'
                        alt='avatar'
                    />
                    <span className='font-weight-bold'>{user.username}<br/>
                    <span className='font-weight-normal fullname'>{user.fullName}</span></span>
                </DropdownItem>
                <DropdownItem divider/>
            </div>
        </Link>
    )

    public renderTag = (hashtag: IHashTag): JSX.Element => (
        <Link to={`/tag/${hashtag.tagName}`}
              className='text-decoration-none interaction' key={hashtag._id}>
            <div className='w-100'>
                <DropdownItem className='p-md-2 p-1 d-flex align-items-center'>
                    <i className='fa fa-hashtag fa-2x mr-2'/>
                    <span className='font-weight-bold'>{hashtag.tagName}<br/>
                    <span className='font-weight-normal fullname'>
                        {hashtag.posts.length} {hashtag.posts.length === 1 ? 'post' : 'posts'}
                    </span></span>
                </DropdownItem>
                <DropdownItem divider/>
            </div>
        </Link>
    )

    public render(): JSX.Element {
        const {loggedUsername, newUsername, searchResults, loaded, loading}: IMenuProps = this.props;
        const {searchValue}: IMenuState = this.state;
        const renderResults = !!searchResults.length && searchResults[0].username ? this.renderUser : this.renderTag;
        return (
            <div className='container-fluid header-menu'>
                <div className='row justify-content-between bg-white'>
                    <Link to='/'>
                        <img src={logo}
                             alt='logo'
                             width={110}
                             className='mb-3 sm-mb-2 sm-mr-5 pt-1 logo interaction'/>
                    </Link>
                    <div className='col-md-4 mt-md-4 mt-0 form-group search'>
                        <span className='fa fa-search form-control-feedback'/>
                        <Input
                            placeholder='Search'
                            type='search'
                            className='form-control px-4 interaction'
                            value={searchValue}
                            onChange={this.onSearchChange}
                        />
                        <Dropdown isOpen={this.state.isMenuOpen}
                                  toggle={(): void => {this.toggle(searchValue); }}
                                  color='light' className='search-menu'>
                            <DropdownToggle tag='a' className='nav-link m-0 p-0'/>
                            <DropdownMenu className='scrollable-menu col-12'>
                                {searchResults.map((result: any) => renderResults(result))}
                                {!searchResults.length && !loading && <span className='ml-3'>No results...</span>}
                                <div className='d-flex justify-content-center'>
                                    {loading && <Spinner color='dark'/>}
                                </div>
                                {!loaded && !loading &&
                                <Waypoint
                                    onEnter={(): void => {
                                        this.getMoreResults();
                                    }}
                                />}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='mt-4'>
                        <Link to={`/mentions`}>
                            <i className='fa fa-at fa-lg pr-4 icon interaction' />
                        </Link>
                        <Link to={`/profile/${newUsername || loggedUsername}/likes`}>
                            <i className='fa fa-heart-o fa-lg pr-4 icon interaction' />
                        </Link>
                        <Link to={`/profile/${newUsername || loggedUsername}`}>
                            <i className='fa fa-user-o fa-lg pr-3 icon interaction'/>
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
    loading: state.search.loading,
    page: state.search.page,
});

const mapDispatchToProps = {
    clearSearchResults,
    getSearchResults,
    addNextResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
