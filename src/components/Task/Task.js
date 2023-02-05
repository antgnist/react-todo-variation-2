import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import './Task.css';
import TimerTask from '../TimerTask';

export default function Task({
  content,
  id,
  updateTask,
  deleteTask,
  completeTask,
  completed,
  creationTime,
  ms,
  startTimer,
  stopTimer,
}) {
  const [edit, setEdit] = useState(false);
  const [oldValue, setOldValue] = useState('');
  const refEditInput = useRef();

  const escListener = useCallback(
    (e) => {
      // console.log('Нажата клавиша: ', e.code);
      if (e.code === 'Escape') {
        updateTask(id, oldValue);
        setOldValue('');
        setEdit(false);
      }
    },
    [updateTask, id, oldValue]
  );

  useEffect(() => {
    if (edit === true) {
      refEditInput.current.focus();
      document.addEventListener('keydown', escListener);
    }
    return () => {
      if (edit === true) {
        document.removeEventListener('keydown', escListener);
      }
    };
  }, [edit, escListener]);

  const editOnHandler = () => {
    setEdit(true);
    setOldValue(content);
  };

  const handleChange = (event) => {
    updateTask(id, event.target.value);
  };

  const handleSubmit = (event) => {
    if (!content) {
      updateTask(id, oldValue);
    }
    setOldValue('');
    setEdit(false);
    event.preventDefault();
  };

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
            editOnHandler();
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
      <form onSubmit={handleSubmit}>
        <input type="text" className="edit" value={content} onChange={handleChange} ref={refEditInput} />
      </form>
    </li>
  );
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
