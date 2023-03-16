import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SpotsIndex from './components/Spots';
import SingleSpotPage from './components/Spots/SingleSpotPage';
import UserDash from './components/UserDash/UserDash';
import ShowCurrUserBookings from './components/Bookings/ShowCurrUserBookings';

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
            <SingleSpotPage />
          </Route>
          <Route path='/dashboard/:userId'>
            <UserDash />
          </Route>
          <Route path='/bookings/:userId'>
            <UserDash tabOverride={"ShowCurrUserBookings"} />
          </Route>
          <Route path='/favorites/:userId'>
            <UserDash tabOverride={"FavoritesTab"} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
