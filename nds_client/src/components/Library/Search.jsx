import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getSearch } from './rdx_axn/axn_filter';

import { ReactComponent as Find } from '../Main/assets/vex/Search.svg';

const Search = React.memo(props => {
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    getSearch();
  }, [inputSearch]);

  return (
    <Fragment>
      <section className='cont row search form'>
        <h3>
          <Find className='menu-title' />
          <input
            type='text'
            value={inputSearch}
            onChange={event => setInputSearch(event.target.value)}
            className='menu-title'
          />
        </h3>
      </section>
    </Fragment>
  );
});

Search.propTypes = {};

export default Search;
