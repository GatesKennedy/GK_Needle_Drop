import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import useCollapse from 'react-collapsed';

const Drop = ({ group, items, category }) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  return (
    <Fragment>
      <div className='stack'>
        {' '}
        <button
          {...getToggleProps({
            onClick: () => setOpen(oldOpen => !oldOpen)
          })}
        >
          {isOpen ? group : group}
        </button>
        <section {...getCollapseProps()}>
          {items.map(item => (
            <li>{item}</li>
          ))}
          {category}
        </section>
      </div>
    </Fragment>
  );
};

Drop.propTypes = {
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  filterIn: state.filterIn
});

export default Drop;
