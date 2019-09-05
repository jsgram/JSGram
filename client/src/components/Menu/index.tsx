import React from 'react';
import logo from '../../assets/logo.png';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { IStateProfileEdit } from '../../store/profileEdit/reducers';
import * as action from '../../store/feed/actions';

interface IStateFeed {
    username: string;
}

interface IState {
    profileEdit: IStateProfileEdit;
    feed: IStateFeed;
}

interface ILocalProps {
    username: string;
    newUsername: string;
    getUserInfoFromToken: () => void;
}

// const Menu = ({newUsername, username, getUserInfoFromToken}: any): any => {
class Menu extends React.Component<ILocalProps> {
    public componentDidMount(): void {
        this.props.getUserInfoFromToken();
    }

    public render(): JSX.Element {
        const {username, newUsername}: ILocalProps = this.props;
        return (
            <div className='container-fluid header-menu'>
                <div className='row justify-content-between bg-white'>
                    <Link to='/'>
                        <img src={logo}
                             alt='logo'
                             width={110}
                             className='mb-3 sm-mb-2 sm-mr-5 pt-1 logo'/>
                    </Link>
                    <div className='w-30 mt-4 mb-4 form-group search d-md-block d-none'>
                        <span className='fa fa-search form-control-feedback'/>
                        <Input placeholder='Search' type='search' className='form-control px-4' disabled={true}/>
                    </div>
                    <div className='mt-4'>
                        <i className='fa fa-compass fa-lg pt-2 pb-2 pr-4 sm-pt-0 icon text-muted'/>
                        <i className='fa fa-heart-o fa-lg pr-4 icon text-muted'/>
                        <Link to={`/profile/${newUsername ? newUsername : username}`}>
                            <i className='fa fa-user-o fa-lg pr-3 icon'/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { newUsername: string, username: string } => ({
    newUsername: state.profileEdit.newUsername,
    username: state.feed.username,
});

const mapDispatchToProps = ({
    getUserInfoFromToken: action.getUserInfoFromToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
