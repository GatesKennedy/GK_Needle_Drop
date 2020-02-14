import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTraitGenus, getTraits } from './rdx_axn/axn_filter';
//  Comps
import Collapse from '../../Main/Collapse';
import Spinner from '../Notify/Spin';
//  Assets
import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Filter = ({ getTraitGenus, getTraits, filter: { traits, loading } }) => {
  useEffect(() => {
    getTraits();
  }, []);

  console.log(traits);

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
          {/* {traits.map(genus => (
            <Collapse genus={genus.genus} />
          ))} */}
        </section>
      )}
    </Fragment>
  );
};

Filter.propTypes = {
  getTraits: PropTypes.func.isRequired,
  getTraitGenus: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  filter: state.filter,
  filterIn: state.filterIn
});

export default connect(mapStateToProps, { getTraitGenus, getTraits })(Filter);
