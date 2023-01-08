import React from 'react';

import './Task.css';

class Task extends React.Component {
  state = { edit: false, oldValue: '', firstEditChange: true };

  editOnHandler = () => {
    this.setState({ edit: true });
  };

  handleChange = (event) => {
    if (this.state.firstEditChange) {
      this.setState({ oldValue: this.props.content, firstEditChange: false });
    }
    this.props.updateTask(this.props.id, event.target.value);
  };

  handleSubmit = (event) => {
    if (!this.props.content) {
      this.props.updateTask(this.props.id, this.state.oldValue);
    }
    this.setState({ firstEditChange: true, oldValue: '', edit: false });
    event.preventDefault();
  };

  render() {
    const { completed, content, creationTime, id, deleteTask, completeTask } =
      this.props;

    let classView = completed ? 'completed' : '';
    if (this.state.edit) {
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
          />
          <label>
            <span className="description">{content}</span>
            <span className="created">created {creationTime}</span>
          </label>
          <button
            onClick={() => {
              this.editOnHandler();
            }}
            className="icon icon-edit"
          ></button>
          <button
            onClick={() => {
              deleteTask(id);
            }}
            className="icon icon-destroy"
          ></button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="edit"
            value={content}
            onChange={this.handleChange}
          ></input>
        </form>
      </li>
    );
  }
}

export default Task;
