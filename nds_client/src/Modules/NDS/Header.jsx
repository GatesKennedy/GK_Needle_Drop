import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, text }) => {
  return (
    <header>
      <div className='bg-pnk2 header' id='page-header'>
        <div className='row head-title'>{title}</div>
        <div className='row head-text'>{text}</div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

export default Header;
