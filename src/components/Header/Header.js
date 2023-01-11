import PropTypes from 'prop-types';

import './Header.css';
import NewTaskForm from '../NewTaskForm';

function Header({ addTask }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addTask={addTask} />
    </header>
  );
}

Header.defaultProps = {
  addTask: () => {},
};
Header.propTypes = {
  addTask: PropTypes.func,
};

export default Header;
