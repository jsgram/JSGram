import React, { ReactElement } from 'react';
import logo from '../assets/logo.png';
import {Input} from 'reactstrap';
import './Menu.scss';
const Menu: React.FC = (): ReactElement => (
    <div className='container-fluid header-menu'>
        <div className='row justify-content-between bg-white'>
                <img src={logo}
                     width={110}
                     className='mb-3 sm-mb-2 sm-mr-5 pt-1 logo'/>
            <div className='w-30 mt-4 mb-4 form-group search d-md-block d-none'>
                <span className='fa fa-search form-control-feedback'/>
                <Input placeholder='Search' type='search' className='form-control px-4'/>
            </div>
            <div className='mt-4'>
                <i className='fa fa-compass fa-lg pt-2 pb-2 pr-4 sm-pt-0 icon'/>
                <i className='fa fa-heart-o fa-lg pr-4 icon'/>
                <i className='fa fa-user-o fa-lg pr-3 icon'/>
            </div>
        </div>
    </div>
);
export default Menu;
