import React from 'react';
import PropTypes from 'prop-types';

import CarolMockasin from './assets/img/carol-mocks.png';

function Carol(props) {
  return (
    <section>
      <div className=' horz-row'>
        <img src={CarolMockasin} />
        <img src={CarolMockasin} />
        <img src={CarolMockasin} />
      </div>
    </section>
  );
}

Carol.propTypes = {};

export default Carol;
