import React from 'react';
import { Link } from 'react-router-dom';

const btn_Register = () => {
  return (
    <div className='center'>
      <Link to='/register'>
        <btn className='btn submit light'>join?</btn>
      </Link>
    </div>
  );
};

export default btn_Register;
