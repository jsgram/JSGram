import React, { ReactElement } from 'react';
import '../styles/Menu.scss';
export const Menu: React.FC = (): ReactElement => (
      <nav className='navig'>
        <div className='navigation-logo'>
        <i className='fa-2x fa fa-instagram inst_icon'></i>
        <h1 className='navigation-logo_jsgram'>JSGram</h1>
        </div>
        <div className='navigation-center'>
        <i className='fa-xxs fa fa-search find_icon'></i>
        <input type='search' className='navigation-input_search' name='q' placeholder='Search'></input>
        </div>
        <ul className='navigation-icons_list'>
          <li className='li_component'><i className='fa-2x fa fa-compass'></i></li>
          <li className='li_component'><i className='fa-2x fa fa-heart'></i></li>
          <li className='li_component'><i className='fa-2x fa fa-user'></i></li>
        </ul>
      </nav>
);
