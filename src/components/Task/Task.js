import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';
import TimerTask from '../TimerTask';

class Task extends React.Component {
  state = { edit: false, oldValue: '' };

  refEditInput = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const { edit } = this.state;
    if (prevState.edit !== edit && edit === true) {
      this.refEditInput.current.focus();
      document.addEventListener('keydown', this.escListener);
    }
  }

  escListener = (e) => {
    const { id, updateTask } = this.props;
    const { oldValue } = this.state;
    if (e.code === 'Escape') {
      document.removeEventListener('keydown', Task.escListener);
      updateTask(id, oldValue);
      this.setState({ oldValue: '', edit: false });
    }
  };

  editOnHandler = () => {
    const { content } = this.props;
    this.setState({ edit: true, oldValue: content });
  };

  handleChange = (event) => {
    const { id, updateTask } = this.props;
    updateTask(id, event.target.value);
  };

  handleSubmit = (event) => {
    const { oldValue } = this.state;
    const { content, updateTask, id } = this.props;
    if (!content) {
      updateTask(id, oldValue);
    }
    this.setState({ oldValue: '', edit: false });
    event.preventDefault();
  };

  render() {
    const { completed, content, creationTime, id, deleteTask, completeTask, ms, startTimer, stopTimer } = this.props;
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
            <TimerTask id={id} completed={completed} ms={ms} startTimer={startTimer} stopTimer={stopTimer} />
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
              stopTimer(id);
              deleteTask(id);
            }}
            aria-label="Delete todo"
            className="icon icon-destroy"
            type="button"
          />
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={this.refEditInput} className="edit" value={content} onChange={this.handleChange} />
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
  ms: 0,
  startTimer: () => {},
  stopTimer: () => {},
};

Task.propTypes = {
  deleteTask: PropTypes.func,
  completeTask: PropTypes.func,
  updateTask: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
  content: PropTypes.string,
  creationTime: PropTypes.string,
  ms: PropTypes.number,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};

export default Task;
