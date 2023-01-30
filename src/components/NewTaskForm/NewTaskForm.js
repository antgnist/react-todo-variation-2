import React from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', min: '', sec: '' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleChangeMin = (event) => {
    this.setState({ min: event.target.value });
  };

  handleChangeSec = (event) => {
    this.setState({ sec: event.target.value });
  };

  handleSubmit = (event) => {
    const { value, min, sec } = this.state;
    const { addTask } = this.props;
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
      this.setState({ value: '', min: '', sec: '' });
    } else {
      alert('Введите данные в правильном формате!');
      this.setState({ min: '', sec: '' });
    }
    event.preventDefault();
  };

  render() {
    const { value, min, sec } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="new-todo-form">
        <input type="text" className="new-todo" placeholder="Task" value={value} onChange={this.handleChange} />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={this.handleChangeMin}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={this.handleChangeSec}
        />
        <button type="submit" className="submit_form" aria-label="Submit" />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addTask: () => {},
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

export default NewTaskForm;
