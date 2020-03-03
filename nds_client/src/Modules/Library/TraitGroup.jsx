import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';
import { updateFilterIn } from './rdx_axn/axn_filter';

const TraitGroup = ({
  updateFilterIn,
  genus,
  species,
  filter: { loading, filterIn }
}) => {
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
  filter: state.filter
});

export default connect(mapStateToProps, { updateFilterIn })(TraitGroup);
