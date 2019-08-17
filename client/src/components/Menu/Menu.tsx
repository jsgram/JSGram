import React, {ReactElement} from 'react';
import '../styles/Menu.scss';
export const Menu: React.FC = (): ReactElement => (
      <nav className='navig'>
        <div className='logo_component'>
        <i className='fa-2x fa fa-instagram inst_icon'></i>
        <h1 className='jsgram'>JSGram</h1>
        </div>
        <div className='center-component'>
        <i className='fa-xxs fa fa-search find_icon'></i>
        <input type='search' className='input_input' name='q' placeholder='Search'></input>
        </div>
        <ul className='list'>
          <li className='li_component'><i className='fa-2x fa fa-compass compass_icon'></i></li>
          <li className='li_component'><i className='fa-2x fa fa-heart heart_icon'></i></li>
          <li className='li_component'><i className='fa-2x fa fa-user user_icon'></i></li>
        </ul>
      </nav>
);
