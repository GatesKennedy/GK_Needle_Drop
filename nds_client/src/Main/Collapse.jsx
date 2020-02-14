import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';
import { getTraitSpecies } from '../Modules/Library/rdx_axn/axn_filter';
import Spinner from '../Modules/Notify/Spin';

const Drop = ({ genus, filter: { items, loading }, category }) => {
  useEffect(() => {
    getTraitSpecies(genus);
  }, []);

  // console.log(items);
  // console.log(genus);

  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='stack'>
          {' '}
          <button
            {...getToggleProps({
              onClick: () => setOpen(oldOpen => !oldOpen)
            })}
          >
            {isOpen ? genus : genus}
          </button>
          <section {...getCollapseProps()}>
            MAPPED
            {category}
          </section>
        </div>
      )}
    </Fragment>
  );
};

Drop.propTypes = {
  getTraitSpecies: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  genus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  filter: state.filter,
  filterIn: state.filterIn
});

export default connect(mapStateToProps, { getTraitSpecies })(Drop);
