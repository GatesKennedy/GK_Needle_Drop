import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';
import { updateFilterIn, updateTraits } from './rdx_axn/axn_filter';

const TraitGroup = ({
  updateFilterIn,
  //updateTraits,
  genus,
  species,
  filter: { loading, filterIn, traits }
}) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  return (
    <Fragment>
      <div
        {...getToggleProps({
          onClick: () => {
            setOpen(oldOpen => !oldOpen);
            updateTraits(genus, traits);
          }
        })}
      >
        <h4>{genus}</h4>
      </div>
      <section {...getCollapseProps()}>
        {loading ? (
          'loading'
        ) : (
          <ul className='stack'>
            {species.map((trait, index) => (
              <li key={index} className='stack'>
                <h5
                  className='filter-item'
                  onClick={() => updateFilterIn(trait, filterIn)}
                >
                  {trait}
                </h5>
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

export default connect(mapStateToProps, { updateFilterIn, updateTraits })(
  TraitGroup
);
