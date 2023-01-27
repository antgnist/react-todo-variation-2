import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';
import TimerTask from '../TimerTask';

class Task extends React.Component {
  constructor() {
    super();
    this.state = { edit: false, oldValue: '', firstEditChange: true };
  }

  editOnHandler = () => {
    this.setState({ edit: true });
  };

  handleChange = (event) => {
    const { firstEditChange } = this.state;
    const { content, id, updateTask } = this.props;
    if (firstEditChange) {
      this.setState({ oldValue: content, firstEditChange: false });
    }
    updateTask(id, event.target.value);
  };

  handleSubmit = (event) => {
    const { oldValue } = this.state;
    const { content, updateTask, id } = this.props;
    if (!content) {
      updateTask(id, oldValue);
    }
    this.setState({ firstEditChange: true, oldValue: '', edit: false });
    event.preventDefault();
  };

  render() {
    const {
      completed,
      content,
      creationTime,
      id,
      deleteTask,
      completeTask,
      ms,
      updateTimer,
      timerFlag,
      controllerTimer,
      timerId,
      updateTimerId,
    } = this.props;
    const { edit } = this.state;

    let classView = completed ? 'completed' : '';
    if (edit) {
      classView += ' editing';
    }

    return (
      <li className={classView}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => {
              completeTask(id);
            }}
            id={id}
          />
          <label htmlFor={id}>
            <span className="title">{content}</span>
            <TimerTask
              id={id}
              ms={ms}
              updateTimer={updateTimer}
              timerFlag={timerFlag}
              controllerTimer={controllerTimer}
              timerId={timerId}
              updateTimerId={updateTimerId}
            />
            <span className="description">created {creationTime}</span>
          </label>
          <button
            onClick={() => {
              this.editOnHandler();
            }}
            aria-label="Edit todo"
            className="icon icon-edit"
            type="button"
          />
          <button
            onClick={() => {
              deleteTask(id);
              clearInterval(timerId);
              updateTimerId(id, null); // удалить
            }}
            aria-label="Delete todo"
            className="icon icon-destroy"
            type="button"
          />
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="edit" value={content} onChange={this.handleChange} />
        </form>
      </li>
    );
  }
}

Task.defaultProps = {
  deleteTask: () => {},
  completeTask: () => {},
  updateTask: () => {},
  id: '',
  completed: false,
  content: '',
  creationTime: 'some time ago',
};

Task.propTypes = {
  deleteTask: PropTypes.func,
  completeTask: PropTypes.func,
  updateTask: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
  content: PropTypes.string,
  creationTime: PropTypes.string,
};

export default Task;
