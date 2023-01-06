import React from 'react';
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

export default Header;
