import React from 'react';

import './Task.css';

class Task extends React.Component {
  render() {
    const {
      edit,
      completed,
      content,
      creationTime,
      id,
      deleteTask,
      completeTask,
    } = this.props;

    let classView = completed ? 'completed' : '';
    if (edit) {
      classView += 'editing';
    }
    return (
      <li className={classView}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={() => {
              completeTask(id);
            }}
          />
          <label>
            <span className="description">{content}</span>
            <span className="created">created {creationTime}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            onClick={() => {
              deleteTask(id);
            }}
            className="icon icon-destroy"
          ></button>
        </div>
        <input type="text" className="edit" value={content}></input>
      </li>
    );
  }
}

export default Task;
