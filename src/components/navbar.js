import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.svg';


const Navbar = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink className="navbar-link" to="/" exact>
            <img id="navbar-logo" src={logo} alt="lor_logo" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
