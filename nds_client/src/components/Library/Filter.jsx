import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';
//  Comps
import Collapse from '../Main/Collapse';
//  Assets
import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Filter = props => {
  const filters = {
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

  console.log('filters:' + Object.keys(filters));
  console.log('filter 0: ' + Object.keys(filters)[0]);
  console.log('items:' + filters.genre);

  return (
    <Fragment>
      <section className='menu stack Filter' id='fitler-cont'>
        <div className='menu-head bg-blu2'>
          <h2 className='menu-title row'>Filter</h2>
          <Add className='menu-title row  menu-btn' />
        </div>
        <Collapse group={Object.keys(filters)[0]} items={filters.genre} />
        <Collapse group={Object.keys(filters)[1]} items={filters.instrument} />
        <Collapse group={Object.keys(filters)[2]} items={filters.keyword} />
        <Collapse group={Object.keys(filters)[3]} items={filters.project} />
      </section>
    </Fragment>
  );
};

Filter.propTypes = {};

export default Filter;
