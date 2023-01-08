import React from 'react';
import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (!!this.state.value) {
      this.props.addTask(this.state.value);
      this.setState({ value: '' });
    }

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.value}
          onChange={this.handleChange}
        ></input>
      </form>
    );
  }
}

export default NewTaskForm;
