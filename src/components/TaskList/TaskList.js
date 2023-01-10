import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './TaskList.css';
import Task from '../Task/';

function TaskList({ tasks, deleteTask, completeTask, updateTask }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            completed={task.completed}
            content={task.content}
            creationTime={formatDistanceToNow(task.creationTime)}
            deleteTask={deleteTask}
            completeTask={completeTask}
            updateTask={updateTask}
          />
        );
      })}
    </ul>
  );
}

TaskList.defaultProps = {
  deleteTask: () => {},
  completeTask: () => {},
  updateTask: () => {},
  tasks: [],
};
TaskList.propTypes = {
  deleteTask: PropTypes.func,
  completeTask: PropTypes.func,
  updateTask: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

export default TaskList;
