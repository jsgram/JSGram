import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab} from '@fortawesome/free-brands-svg-icons';
import {faHeart, faCompass, faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.scss';

library.add(fab, faHeart, faCompass, faSearch, faUser);
class Menu extends React.Component {
    public render():
    JSX.Element {
        return (
      <nav className='navig'>
        <div className='logo_component'>
        <FontAwesomeIcon className='inst_icon' icon={['fab', 'instagram']} size='lg'/>
        <h1 className="jsgram">JSGram</h1>
        </div>
        <div className='center-component'>
          <FontAwesomeIcon className='find_icon' icon={faSearch} size='xs'/>
        <input type='search' className='input_input' name='q' placeholder='Search'></input>
        </div>
        <ul className='list'>
          <li className='li_component'><FontAwesomeIcon className='compass_icon' icon={faCompass} size='lg'/></li>
          <li className='li_component'><FontAwesomeIcon className='heart_icon' icon={faHeart}  size='lg'/></li>
          <li className='li_component'><FontAwesomeIcon className='user_icon' icon={faUser} size='lg'/></li>
        </ul>
      </nav>
        );
    }
}
export default Menu;
