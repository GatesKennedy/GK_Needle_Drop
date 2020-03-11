//  React
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const User = props => {
  return (
    <div>
      User Page
      <Link to='/login' className='stack center'>
        <div className=' btn'>Login</div>
      </Link>
      <Link to='/register' className='stack center'>
        <div className=' btn'>Register</div>
      </Link>
    </div>
  );
};

User.propTypes = {};

export default User;
