import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Drop = props => {
  return (
    <Fragment>
      <section class='open drop group'>
        <div>
          <h4 class='group-name'>
            <i class='fas fa-filter' />
          </h4>
        </div>
      </section>
    </Fragment>
  );
};

Drop.propTypes = {};

export default Drop;
