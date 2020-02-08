import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTraitGenus } from './rdx_axn/axn_filter';
//  Comps
import Collapse from '../Main/Collapse';
import Spinner from '../Notify/Spin';
//  Assets
import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Filter = ({ getTraitGenus, filter: { traits, loading } }) => {
  useEffect(() => {
    getTraitGenus();
  }, []);

  console.log(traits);

  // console.log('filter 0: ' + Object.keys(traits)[0]);
  // console.log('items:' + traits.genre);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <section className='menu stack Filter' id='fitler-cont'>
          <div className='menu-head bg-blu2'>
            <h2 className='menu-title row'>Filter</h2>
            <Add className='menu-title row  menu-btn' />
          </div>
          {traits.map(genus => (
            <Collapse genus={genus.genus} />
          ))}
        </section>
      )}
    </Fragment>
  );
};

Filter.propTypes = {
  getTraitGenus: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  filter: state.filter,
  filterIn: state.filterIn
});

export default connect(mapStateToProps, { getTraitGenus })(Filter);
