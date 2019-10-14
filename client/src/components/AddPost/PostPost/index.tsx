import React from 'react';
import { Container, Row, Input, DropdownToggle, DropdownMenu,
         Dropdown, DropdownItem, Spinner } from 'reactstrap';
import './style.scss';
import { connect } from 'react-redux';
import { clearSearchResults, getSearchResults, addNextResults } from '../../../store/search/actions';
import noAvatar from '../../../assets/noAvatar.png';
import { Waypoint } from 'react-waypoint';
import { MENTIONS_REGEX } from '../../../helpers/regex.description';
import { ISearchState } from '../../../store/search/reducers';

export interface IPostPostProps {
    croppedImage: string;
    description: string;
    page: number;
    searchResults: any;
    loaded: boolean;
    loading: boolean;
    setDescriptionForPost: (description: string) => void;
    clearSearchResults: () => void;
    getSearchResults: (query: string, page: number) => void;
    addNextResults: (page: number) => void;
}

interface IPostPhotoState {
    isModalOpen: boolean;
    searchValue: string;
}

interface IState {
    search: ISearchState;
}

interface IOwnProps {
    croppedImage: string;
    description: string;
    setDescriptionForPost: (description: string) => void;
}

interface ILocalState {
    croppedImage: string;
    description: string;
    page: number;
    searchResults: object[];
    loaded: boolean;
    loading: boolean;
    setDescriptionForPost: (description: string) => void;
}

export class PostPhoto extends React.Component<IPostPostProps> {

    public state: IPostPhotoState = {
        isModalOpen: false,
        searchValue: '',
    };
    public timer: any;

    public componentWillUnmount = (): void => {
        clearTimeout(this.timer);
        this.props.clearSearchResults();
        this.setState({searchValue: ''});
        this.toggle('');
    }

    public onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        clearTimeout(this.timer);
        const FIRST_PAGE = 1;
        this.props.setDescriptionForPost(event.target.value);
        const mentions: any = event.target.value.match(MENTIONS_REGEX);
        if (mentions) {
            const query: string = mentions.pop();
            this.setState({searchValue: query});
            if (this.state.searchValue !== query) {
                this.timer = setTimeout(() => {
                    this.timer = null;
                    this.props.getSearchResults(query.slice(1), FIRST_PAGE);
                    this.toggle(query);
                }, 500);
            } else {
                this.toggle('');
            }
        } else {
            this.toggle('');
        }
    }

    public getMoreResults = (): void => {
        const mentions: any = this.props.description.match(MENTIONS_REGEX);
        const query: string = mentions.pop();
        this.props.addNextResults(this.props.page + 1);
        this.props.getSearchResults(query.slice(1), this.props.page);
    }

    public toggle = (searchQuery: string): void => {
        this.setState({
            isModalOpen: searchQuery !== '',
        });
    }

    public onUserSelect = (e: React.MouseEvent, username: string): void => {
        const mentions: any = this.props.description.match(MENTIONS_REGEX);
        const query: string = mentions.pop();
        const updDescription = this.props.description.replace(new RegExp(query + '$'), `@${username}`);
        this.props.setDescriptionForPost(updDescription);
        this.setState({searchValue: `@${username}`});
        this.props.clearSearchResults();
        this.toggle('');
    }

    public render(): JSX.Element {
        return (
            <Container>
                <Row>
                    <div className=' mx-auto mt-3 post-label'>New post</div>
                </Row>
                <Row className='mt-2 mx-auto post'>
                    <img
                        src={this.props.croppedImage}
                        height={293}
                        className='img-fluid rounded w-100'
                        alt='cropped img'
                    />
                    <Input
                        className='mt-3'
                        type='textarea'
                        name='description'
                        placeholder='Write a caption...'
                        spellCheck={false}
                        value={this.props.description}
                        onChange={this.onDescriptionChange}
                        maxLength={200}
                    />
                    <Dropdown className='search-menu w-75' color='light'
                          isOpen={this.state.isModalOpen} inNavbar={true} direction='up'
                          toggle={(): void => {this.toggle(this.state.searchValue); }}>
                    <DropdownToggle tag='a' className='nav-link m-0 p-0'/>
                    <DropdownMenu className='scrollable-menu col-12 mb-5'>
                        {this.props.searchResults.map((user: any) =>
                        <div key={user._id} onClick={(e: React.MouseEvent): void => {
                            this.onUserSelect(e, user.username);
                        }}>
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
                            </div> )}
                            <div className='d-flex justify-content-center'>
                                    {this.props.loading && <Spinner color='dark'/>}
                                </div>
                                {!this.props.loaded && !this.props.loading &&
                                <Waypoint
                                    onEnter={(): void => {
                                        this.getMoreResults();
                                    }}
                                />}
                    </DropdownMenu>
                </Dropdown>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state: IState, ownProps: IOwnProps): ILocalState => ({
    croppedImage: ownProps.croppedImage,
    description: ownProps.description,
    setDescriptionForPost: ownProps.setDescriptionForPost,
    page: state.search.page,
    searchResults: state.search.searchResults,
    loaded: state.search.loaded,
    loading: state.search.loading,
});

const mapDispatchToProps = {
    clearSearchResults,
    getSearchResults,
    addNextResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPhoto);
