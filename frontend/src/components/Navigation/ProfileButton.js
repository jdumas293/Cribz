import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
    
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);
    
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };
    
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={openMenu}>
                <i className="fa-solid fa-user" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.firstName} {user.lastName}</li>
                        <li>{user.email}</li>
                        <li>
                            <button id='logout-current-user-btn' onClick={logout}>Log Out</button>
                        </li>
                        <li>
                            <button id='user-dash' onClick={() => history.push(`/dashboard/${user?.id}`)}>User Profile</button>
                        </li>
                    </>
                ) : (
                    <>
                        <div className='profile-btn-dropdown-options'>
                            <li>
                                <OpenModalButton
                                    buttonText="Log In"
                                    onButtonClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                            </li>
                            <li>
                                <OpenModalButton
                                    buttonText="Sign Up"
                                    onButtonClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </li>
                            <li>
                                <OpenModalButton
                                    buttonText="Demo User"
                                    onButtonClick={() => dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))}
                                />
                            </li>
                        </div>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;