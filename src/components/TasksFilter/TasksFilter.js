import React from 'react';
import './TasksFilter.css';

class TasksFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All', className: 'tasksFilter__all' },
    { name: 'active', label: 'Active', className: 'tasksFilter__active' },
    {
      name: 'completed',
      label: 'Completed',
      className: 'tasksFilter__completed',
    },
  ];

  render() {
    const { currentFilter, setFilter } = this.props;

    return (
      <ul className="filters">
        {this.buttons.map(({ name, label, className }) => {
          const clazz =
            currentFilter === name ? className + ' selected' : className;

          return (
            <li key={name}>
              <button
                type="button"
                name={name}
                className={clazz}
                onClick={() => setFilter(name)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default TasksFilter;