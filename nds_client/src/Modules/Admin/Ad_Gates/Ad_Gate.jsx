import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const Ad_Gate = props => {
  return (
    <section>
      <div>.: Go Away :.</div>
      <div>
        User Page
        <Link to='/blckknght/fornownotever/login' className='stack center'>
          <div className=' btn'>Login</div>
        </Link>
        <Link to='/blckknght/fornownotever/register' className='stack center'>
          <div className=' btn'>Register</div>
        </Link>
      </div>
    </section>
  );
};

Ad_Gate.propTypes = {};

export default Ad_Gate;
