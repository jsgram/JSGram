import React, { ReactElement } from 'react';
import logo from '../assets/logo.png';
import {Input} from 'reactstrap';
import '../styles/Menu.scss';
export const Menu: React.FC = (): ReactElement => (
    <div className='container-fluid'>
        <div className='row justify-content-between pt-3 bg-white'>
            <div>
                <img src={logo}
                     width={110}
                     className='ml-0 mb-1'
                />
            </div>
            <div className=' w-30 mt-3 form-group has-search d-sm-block d-none'>
                <span className='fa fa-search form-control-feedback'/>
                <Input placeholder='Search' type='search' className='form-control px-4'/>
            </div>
            <div className='mt-3 pt-1'>
                <i className='fa fa-compass fa-lg pr-4'/>
                <i className='fa fa-heart-o fa-lg pr-4'/>
                <i className='fa fa-user-o fa-lg'/>
            </div>
        </div>
    </div>
);
