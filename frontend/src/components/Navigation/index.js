import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SpotFormModal from '../Spots/SpotFormModal';
import OpenModalButton from '../OpenModalButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className='nav-bar'>
      <NavLink exact to="/">Home</NavLink>
      <OpenModalButton
        buttonText="List a Spot"
        // onButtonClick={closeMenu}
        modalComponent={<SpotFormModal />}
      />
      {isLoaded && (
        <ProfileButton user={sessionUser} />
      )}
    </nav>
    // <ul>
    //   <li>
    //     <NavLink exact to="/">Home</NavLink>
    //   </li>
    //   {isLoaded && (
    //     <li>
    //       <ProfileButton user={sessionUser} />
    //     </li>
    //   )}
    //   <li>
    //       <OpenModalButton
    //         buttonText="List a Spot"
    //         // onButtonClick={closeMenu}
    //         modalComponent={<SpotFormModal />}
    //       />
    //   </li>
    // </ul>
  );
}

export default Navigation;