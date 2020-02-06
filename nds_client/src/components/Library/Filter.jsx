import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTraitGenus } from './rdx_axn/axn_filter';
//  Comps
import Collapse from '../Main/Collapse';
//  Assets
import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Filter = ({ getTraits, traits }) => {
  useEffect(() => {
    getTraitGenus();
  }, []);

  console.log(traits);

  const fuhGettaBoudet = {
    /*
  const traits = {
    genre: [
      'ambient',
      'cinematic',
      'dance',
      'electronic',
      'folk/americana',
      'holiday',
      'indie',
      'pop',
      'rock',
      'slowjams',
      'world',
      'blues/roots/jazz',
      'orchestral',
      'experimental'
    ],
    instrument: [
      'acoustic guitar',
      'bass',
      'backing vocal',
      'drum machine',
      'claps',
      'electric guitar',
      'horns',
      'piano',
      'bells/chimes',
      'glock/toy piano',
      'percussion',
      'strings',
      'synth',
      'ukulele',
      'organ',
      'whistle'
    ],
    keyword: [
      'anthemic',
      'epic',
      'calm',
      'dark',
      'tense',
      'ethereal',
      'fun',
      'energizing',
      'playful',
      'quirky',
      'happy',
      'uplifting',
      'intimate',
      'lo-fi',
      'pensive',
      'romantic',
      'sad',
      'sentimental',
      'emotional',
      'sexy',
      'soulful',
      'psychedelic',
      'retro',
      'swagger'
    ],
    project: [
      'action',
      'avant garde',
      'business',
      'childrens',
      'drama/documentary',
      'holiday',
      'horror',
      'lookbook/fashion',
      'road trip',
      'indie',
      'romantic',
      'scifi/fantasy',
      'sports',
      'thriller',
      'wedding',
      'western'
    ]
  };
  */
  };

  // console.log('traits:' + Object.keys(traits));
  // console.log('filter 0: ' + Object.keys(traits)[0]);
  // console.log('items:' + traits.genre);

  return (
    <Fragment>
      <section className='menu stack Filter' id='fitler-cont'>
        <div className='menu-head bg-blu2'>
          <h2 className='menu-title row'>Filter</h2>
          <Add className='menu-title row  menu-btn' />
        </div>
      </section>
    </Fragment>
  );
};

Filter.propTypes = {
  getTraitGenus: PropTypes.func.isRequired,
  traits: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  traits: state.traits,
  filterIn: state.filterIn
});

export default connect(mapStateToProps, { getTraitGenus })(Filter);
