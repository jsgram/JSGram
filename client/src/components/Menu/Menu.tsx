import React from 'react';
// import MainScreen from './Components/MainScreen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab} from '@fortawesome/free-brands-svg-icons'
import {faHeart,faCompass,faSearch,faUser} from '@fortawesome/free-solid-svg-icons'

 
library.add(fab, faHeart,faCompass,faSearch,faUser)

export default class Menu extends React.Component {
  render() {
    return (
      <nav className='navbar'>
        <div className="logo">
        <FontAwesomeIcon className="inst" icon={['fab','instagram']} size="lg"/>
        <h1>JSGram</h1>
        </div>
        <div className="center">
          <FontAwesomeIcon className="site-search" icon={faSearch} size="xs"/>
        <input type="search" className="input" name="q" placeholder="Search"></input>
        </div>
        <ul className="list">
          <li><FontAwesomeIcon className="compass" icon={faCompass} size="lg"/></li>
          <li><FontAwesomeIcon className="heart" icon={faHeart}  size="lg"/></li>
          <li><FontAwesomeIcon className="user" icon={faUser} size="lg"/></li>
        </ul>
      </nav>
    );
  }
}

