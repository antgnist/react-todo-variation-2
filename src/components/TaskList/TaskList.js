import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './TaskList.css';
import Task from '../Task/';

function TaskList({ tasks, deleteTask, completeTask }) {
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
          />
        );
      })}

      <Task
        edit="editing"
        content="Editing task"
        creationTime="15 minutes ago"
      />
    </ul>
  );
}

export default TaskList;
