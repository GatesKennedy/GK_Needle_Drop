import React from 'react';
import PropTypes from 'prop-types';

const CardApprove = props => {
  return (
    <div className='ui card'>
      <div className='content center'>Are you sure?</div>
      <div className='content center'>
        <div className='ui btns '>
          <div className='ui btn pos'>Approve</div>
          <div className='ui btn neg'>Reject</div>
        </div>
      </div>
    </div>
  );
};

CardApprove.propTypes = {};

export default CardApprove;
