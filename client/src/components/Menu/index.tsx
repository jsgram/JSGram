import React, { ReactElement } from 'react';
import logo from '../../assets/logo.png';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.scss';

const Menu: any = ({username}: any): ReactElement => (
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
                <Input placeholder='Search' type='search' className='form-control px-4'/>
            </div>
            <div className='mt-4'>
                <i className='fa fa-compass fa-lg pt-2 pb-2 pr-4 sm-pt-0 icon'/>
                <i className='fa fa-heart-o fa-lg pr-4 icon'/>
                <Link to={`/profile/${username}`}><i className='fa fa-user-o fa-lg pr-3 icon'/></Link>
            </div>
        </div>
    </div>
);
export default Menu;
