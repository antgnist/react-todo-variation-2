import React from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    const { value } = this.state;
    const { addTask } = this.props;
    if (value) {
      addTask(value);
      this.setState({ value: '' });
    }
    event.preventDefault();
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={this.handleChange}
        />
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
