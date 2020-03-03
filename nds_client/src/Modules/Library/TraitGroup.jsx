import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';
import { updateFilterIn, getFiltered } from './rdx_axn/axn_filter';

const TraitGroup = ({
  updateFilterIn,
  getFiltered,
  genus,
  species,
  filterIn,
  filter: { loading }
}) => {
  useEffect(() => {
    getFiltered();
  }, []);

  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  return (
    <Fragment>
      <div
        {...getToggleProps({
          onClick: () => setOpen(oldOpen => !oldOpen)
        })}
      >
        {genus}
      </div>
      <section {...getCollapseProps()}>
        {loading ? (
          'loading'
        ) : (
          <ul className='stack'>
            {species.map(trait => (
              <li className='stack'>
                <button onClick={() => updateFilterIn(trait, filterIn)}>
                  {trait}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Fragment>
  );
};

TraitGroup.propTypes = {};

const mapStateToProps = state => ({
  filter: state.filter,
  filterIn: state.filterIn
});

export default connect(mapStateToProps, { updateFilterIn, getFiltered })(
  TraitGroup
);
