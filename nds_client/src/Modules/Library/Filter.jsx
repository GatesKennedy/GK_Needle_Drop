import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';
//  REDUX
import { updateFilterIn, getTraits, getFiltered } from './rdx_axn/axn_filter';
import { updateLibType } from './rdx_axn/axn_library';
//  Comps
import Spinner from '../Notify/Spin';
import TraitGroup from './TraitGroup';
//  Assets
import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Filter = ({
  getFiltered,
  getTraits,
  updateFilterIn,
  updateLibType,
  libType,
  filter: { traits, filterIn, filterResult, loading }
}) => {
  useEffect(() => {
    getFiltered();
    getTraits();
  }, []);

  const [isOpen, setOpen] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  if (libType != 'filtering') setOpen(oldOpen => !oldOpen);

  return (
    <Fragment>
      <div className='menu' id='menu-side'>
        <section>
          <div
            className='menu-head bg-blu2'
            {...getToggleProps({
              onClick: () => {
                setOpen(oldOpen => !oldOpen);
                updateLibType('filtering', filterResult);
              }
            })}
          >
            <h2 className='menu-title row'>{isOpen ? 'Filter' : 'Filter'}</h2>
            <Add className='menu-title row  menu-btn' />
          </div>
        </section>
        <section {...getCollapseProps()}>
          <section>
            {Array.isArray(filterIn) ? (
              <div>
                {filterIn.map(trait => (
                  <button
                    className='btn-filter'
                    id='filter-item'
                    key={trait.id}
                    onClick={() => updateFilterIn(trait, filterIn)}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            ) : (
              <h5 className='center'>select a filter..</h5>
            )}
          </section>

          {Array.isArray(traits) ? (
            <section className='menu stack filter' id='fitler-cont'>
              {traits.map((genus, index) => (
                <TraitGroup
                  key={index}
                  genus={genus.genus}
                  species={genus.species}
                />
              ))}
            </section>
          ) : (
            <Spinner />
          )}
        </section>
      </div>
    </Fragment>
  );
};

Filter.propTypes = {};

const mapStateToProps = state => ({
  filter: state.filter,
  libType: state.library.libType
});

export default connect(mapStateToProps, {
  getTraits,
  updateFilterIn,
  updateLibType,
  getFiltered
})(Filter);
