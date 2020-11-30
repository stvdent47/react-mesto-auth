import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <>
      <Header />
      <Route>
        {() =>
          props.loggedIn ? <Component {...props} /> : <Redirect to='/login' />
        }
      </Route>
      <Footer />
    </>
  );
};

export default ProtectedRoute;
