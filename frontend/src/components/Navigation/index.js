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
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      <li>
          <OpenModalButton
            buttonText="List a Spot"
            // onButtonClick={closeMenu}
            modalComponent={<SpotFormModal />}
          />
      </li>
    </ul>
  );
}

export default Navigation;