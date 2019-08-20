import React, { ReactElement } from 'react';
import logo from '../assets/logo.png';
import { Input } from 'reactstrap';
import '../styles/Menu.scss';
import '../styles/style.scss';

export const Menu: React.FC = (): ReactElement => (
    <div className='row justify-content-between pt-3 bg-white'>
        <div>
            <img src={logo}
                 width={130}
                 className='img-fluid mb-1'
            />
        </div>
         <div className='mt-3 form-group has-search'>
             <span className='fa fa-search form-control-feedback'/>
             <Input placeholder='Search' type='search' className='form-control'/>
         </div>
        <div className='mt-3 pt-1'>
            <i className='fa fa-compass fa-2x pr-4'/>
            <i className='fa fa-heart-o fa-2x pr-4'/>
            <i className='fa fa-user-o fa-2x'/>
        </div>
    </div>
);
