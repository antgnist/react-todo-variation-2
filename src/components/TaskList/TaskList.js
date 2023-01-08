import React from 'react';
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

export default TaskList;
