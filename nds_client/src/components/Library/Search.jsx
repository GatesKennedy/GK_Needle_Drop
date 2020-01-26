import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getSearch } from './rdx_axn/axn_filter';

const Search = React.memo(props => {
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    getSearch();
  }, [inputSearch]);

  return (
    <Fragment>
      <section>
        <div className='cont search form'>
          <label>Search Library</label>
          <input
            type='text'
            value={inputSearch}
            onChange={event => setInputSearch(event.target.value)}
          />
        </div>
      </section>
    </Fragment>
  );
});

Search.propTypes = {};

export default Search;
