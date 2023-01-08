import React from 'react';
import './Footer.css';
import TasksFilter from '../TasksFilter';

function Footer({ todoCount, clearCompleted }) {
  let praseLeft = +todoCount === 1 ? 'item' : 'items';
  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCount} {praseLeft} left
      </span>
      <TasksFilter />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
