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
import Collapse from '../../Main/Collapse';
import Spinner from '../Notify/Spin';
import TraitGroup from './TraitGroup';
//  Assets
import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Filter = ({ getTraits, getLibTraits, filter: { traits, loading } }) => {
  useEffect(() => {
    getTraits();
    getLibTraits();
  }, []);

  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  return (
    <Fragment>
      <div
        className='menu-head bg-blu2'
        {...getToggleProps({
          onClick: () => setOpen(oldOpen => !oldOpen)
        })}
      >
        <h2 className='menu-title row'>{isOpen ? 'Filter' : 'Filter'}</h2>
        <Add className='menu-title row  menu-btn' />
      </div>
      <section {...getCollapseProps()}>
        {loading ? (
          <Spinner />
        ) : (
          <section className='menu stack Filter' id='fitler-cont'>
            {traits.map(genus => (
              <TraitGroup
                key={genus.id}
                genus={genus.genus}
                species={genus.species}
              />
            ))}
          </section>
        )}
      </section>
    </Fragment>
  );
};

Filter.propTypes = {};

const mapStateToProps = state => ({
  filter: state.filter,
  filterIn: state.filterIn
});

export default connect(mapStateToProps, { getLibTraits, getTraits })(Filter);
