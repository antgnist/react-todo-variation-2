import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

function NewTaskForm({ addTask }) {
  const [values, setValues] = useState({ value: '', min: '', sec: '' });
  const { value, min, sec } = values;

  const handleChange = (name, event) => {
    setValues((oldState) => ({ ...oldState, [name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    function transformTime(m, s) {
      if (!(Number.isFinite(+m) && Number.isFinite(+s))) {
        return null;
      }
      if (!m.trim() && !s.trim()) {
        return 0;
      }
      return Math.trunc(+m * 60 * 1000 + +s * 1000);
    }

    const msTime = transformTime(min, sec);

    if (value && msTime !== null) {
      addTask(value, msTime);
      setValues({ value: '', min: '', sec: '' });
    } else {
      alert('Введите данные в правильном формате!');
      setValues((oldState) => ({ ...oldState, min: '', sec: '' }));
    }
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <input
        type="text"
        className="new-todo"
        placeholder="Task"
        value={value}
        onChange={(e) => {
          handleChange('value', e);
        }}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={(e) => {
          handleChange('min', e);
        }}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={(e) => {
          handleChange('sec', e);
        }}
      />
      <button type="submit" className="submit_form" aria-label="Submit" />
    </form>
  );
}

NewTaskForm.defaultProps = {
  addTask: () => {},
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

export default NewTaskForm;
