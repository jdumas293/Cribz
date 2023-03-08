import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SpotsIndex from './components/Spots';
import SpotDetails from './components/Spots/SpotDetails';
import UserDash from './components/UserDash/UserDash';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsIndex />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path='/dashboard/:userId'>
            <UserDash />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
