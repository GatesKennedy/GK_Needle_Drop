import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';
//  REDUX
import {
  getTraitSpecies,
  updateFilterIn,
  getTraits,
  getLibTraits
} from './rdx_axn/axn_filter';
//  Comps
import Spinner from '../Notify/Spin';
import TraitGroup from './TraitGroup';
//  Assets
import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Filter = ({
  getTraits,
  getLibTraits,
  updateFilterIn,
  filter: { traits, filterIn, loading }
}) => {
  useEffect(() => {
    getTraits();
    getLibTraits();
  }, []);

  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  return (
    <Fragment>
      <div className='menu' id='menu-side'>
        <section>
          <div
            className='menu-head bg-blu2'
            {...getToggleProps({
              onClick: () => setOpen(oldOpen => !oldOpen)
            })}
          >
            <h2 className='menu-title row'>{isOpen ? 'Filter' : 'Filter'}</h2>
            <Add className='menu-title row  menu-btn' />
          </div>
        </section>

        <section>
          {Array.isArray(filterIn) ? (
            <div>
              {filterIn.map(trait => (
                <button onClick={() => updateFilterIn(trait, filterIn)}>
                  {trait}
                </button>
              ))}
            </div>
          ) : (
            <div>select a filter..</div>
          )}
        </section>

        <section {...getCollapseProps()}>
          {loading ? (
            <Spinner />
          ) : (
            <section className='menu stack Filter' id='fitler-cont'>
              {traits.map(genus => (
                <TraitGroup
                  key={genus.genus}
                  genus={genus.genus}
                  species={genus.species}
                />
              ))}
            </section>
          )}
        </section>
      </div>
    </Fragment>
  );
};

Filter.propTypes = {};

const mapStateToProps = state => ({
  filter: state.filter
});

export default connect(mapStateToProps, {
  getLibTraits,
  getTraits,
  updateFilterIn
})(Filter);
