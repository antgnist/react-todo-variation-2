import PropTypes from 'prop-types';
import './TasksFilter.css';

export default function TasksFilter({ currentFilter, setFilter }) {
  const buttons = [
    { name: 'all', label: 'All', className: 'tasksFilter__all' },
    { name: 'active', label: 'Active', className: 'tasksFilter__active' },
    {
      name: 'completed',
      label: 'Completed',
      className: 'tasksFilter__completed',
    },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ name, label, className }) => {
        const clazz = currentFilter === name ? `${className} selected` : className;

        return (
          <li key={name}>
            <button type="button" name={name} className={clazz} onClick={() => setFilter(name)}>
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

TasksFilter.defaultProps = {
  setFilter: () => {},
  currentFilter: '',
};

TasksFilter.propTypes = {
  setFilter: PropTypes.func,
  currentFilter: PropTypes.string,
};
