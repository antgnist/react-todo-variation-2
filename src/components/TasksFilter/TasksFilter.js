import React from 'react';
import './TasksFilter.css';

class TasksFilter extends React.Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button type="button" className="selected tasksFilter__all">
            All
          </button>
        </li>
        <li>
          <button type="button" className="tasksFilter__active">
            Active
          </button>
        </li>
        <li>
          <button type="button" className="tasksFilter__completed">
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

export default TasksFilter;
