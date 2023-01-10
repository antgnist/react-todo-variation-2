import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter';

function Footer({ todoCount, clearCompleted, setFilter, currentFilter }) {
  let phraseLeft = +todoCount === 1 ? 'item' : 'items';
  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCount} {phraseLeft} left
      </span>
      <TasksFilter setFilter={setFilter} currentFilter={currentFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  clearCompleted: () => {},
  setFilter: () => {},
  currentFilter: '',
  todoCount: 0,
};
Footer.propTypes = {
  clearCompleted: PropTypes.func,
  setFilter: PropTypes.func,
  currentFilter: PropTypes.string,
  todoCount: PropTypes.number,
};

export default Footer;
