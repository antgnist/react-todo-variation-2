import React from 'react';
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

export default Footer;
