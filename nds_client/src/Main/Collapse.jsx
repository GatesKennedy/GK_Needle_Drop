import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';

const Collapse = ({ titleOpen, titleClosed, contentList }) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  return (
    <Fragment>
      <div className='stack'>
        {' '}
        <div
          {...getToggleProps({
            onClick: () => setOpen(oldOpen => !oldOpen)
          })}
        >
          {isOpen ? <div>{titleOpen}</div> : <div>{titleClosed}</div>}
        </div>
        <section {...getCollapseProps()}>MAPPED</section>
      </div>
    </Fragment>
  );
};

Collapse.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Collapse);
