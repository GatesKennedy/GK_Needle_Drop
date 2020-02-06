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
          {isOpen ? 'open' : group}
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

//

Drop.propTypes = {
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  filterActive: state.filterActive,
  group: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired
});

export default Drop;
