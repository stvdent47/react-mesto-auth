import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <>
      <Route exact path={props.path}>
        {() =>
          props.loggedIn ? <Component {...props} /> : <Redirect to='/login' />
        }
      </Route>
    </>
  );
};

export default ProtectedRoute;
