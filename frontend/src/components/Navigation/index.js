import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SpotFormModal from '../Spots/SpotFormModal';
import OpenModalButton from '../OpenModalButton';
import './Navigation.css';
import logo from '../../assets/logo-no-background.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
        <div className='home-btn'>
          <NavLink exact to="/"><img id='logo-img' src={logo} alt='Cribz' /></NavLink>
        </div>
        <div className='other-nav'>
          <div className='list-spot-btn'>
            <OpenModalButton
              buttonText="List Spot"
              // onButtonClick={closeMenu}
              modalComponent={<SpotFormModal />}
            />
          </div>
          <div className='profile-btn'>
            {isLoaded && (
              <ProfileButton user={sessionUser} />
            )}
          </div>
        </div>
    </div>
  );
}

export default Navigation;