import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SpotFormModal from '../Spots/SpotFormModal';
import OpenModalButton from '../OpenModalButton';
import logo from '../../assets/logo-no-background.png';
import SearchFilter from '../SearchFilter/SearchFilter';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // const spots = Object.values(useSelector(state => state?.spots?.allSpots));

  return (
    <div className='nav-background-container'>
      <div className='nav-elements-container'>
        <div className='home-btn'>
          <NavLink exact to="/"><img id='logo-img' src={logo} alt='Cribz' /></NavLink>
        </div>
        {/* <div className='nav-search-filter'>
          <SearchFilter />
        </div> */}
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
    </div>
  );
}

export default Navigation;