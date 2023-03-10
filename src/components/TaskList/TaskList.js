import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './TaskList.css';
import Task from '../Task';

function TaskList({ tasks, deleteTask, completeTask, updateTask, startTimer, stopTimer }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          completed={task.completed}
          content={task.content}
          creationTime={formatDistanceToNow(task.creationTime)}
          deleteTask={deleteTask}
          completeTask={completeTask}
          updateTask={updateTask}
          ms={task.ms}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  deleteTask: () => {},
  completeTask: () => {},
  updateTask: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  tasks: [],
};
TaskList.propTypes = {
  deleteTask: PropTypes.func,
  completeTask: PropTypes.func,
  updateTask: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      completed: PropTypes.bool,
      creationTime: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
      id: PropTypes.string,
    })
  ),
};

export default TaskList;
