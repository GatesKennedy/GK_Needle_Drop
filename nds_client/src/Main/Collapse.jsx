import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';
import {
  getTraitSpecies,
  updateFilterIn
} from '../Modules/Library/rdx_axn/axn_filter';
import Spinner from '../Modules/Notify/Spin';
import { TRAITS_CLEAR } from './util/axn_types';
import { getPlaylist } from '../Modules/Library/rdx_axn/axn_playlist';

const Drop = ({
  genus,
  species,
  updateFilterIn,
  filter: { filterIn, loading }
}) => {
  //useEffect(() => {}, []);

  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  console.log(species);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='stack'>
          {' '}
          <div
            {...getToggleProps({
              onClick: () => setOpen(oldOpen => !oldOpen)
            })}
          >
            {isOpen ? genus : genus}
          </div>
          <section {...getCollapseProps()}>
            <ul className='stack'>
              {species.map(trait => (
                <li className='stack'>
                  <button onClick={() => updateFilterIn(trait, filterIn)}>
                    {trait}
                  </button>
                </li>
              ))}
            </ul>
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
  filter: state.filter
});

export default connect(mapStateToProps, { getTraitSpecies, updateFilterIn })(
  Drop
);
