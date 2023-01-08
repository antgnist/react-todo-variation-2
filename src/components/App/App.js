import React from 'react';
import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import Task from '../Task';
import TaskList from '../TaskList';
import TasksFilter from '../TasksFilter';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          content: 'для примера 1',
          completed: false,
          creationTime: new Date() - 239949,
          id: crypto.randomUUID(),
        },
        {
          content: 'для примера ля-ля',
          completed: false,
          creationTime: new Date() - 10000000,
          id: crypto.randomUUID(),
        },
        {
          content: 'для примера 3',
          completed: false,
          creationTime: new Date(),
          id: crypto.randomUUID(),
        },
      ],

      filter: 'all',
    };
    this.addTaskHandler = this.addTaskHandler.bind(this);
    this.deleteTaskHandler = this.deleteTaskHandler.bind(this);
    this.completeTaskHandler = this.completeTaskHandler.bind(this);
  }

  addTaskHandler(text) {
    const newTask = {
      content: text,
      completed: false,
      creationTime: new Date(),
      id: crypto.randomUUID(),
    };
    this.setState(({ tasks }) => {
      return { tasks: [newTask, ...tasks] };
    });
  }
  deleteTaskHandler(id) {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((task) => task.id !== id),
      };
    });
  }
  completeTaskHandler(id) {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      };
    });
  }

  updateTaskHandler = (id, newText) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((task) => {
          if (task.id === id) {
            return { ...task, content: newText };
          }
          return task;
        }),
      };
    });
  };

  clearCompletedHandler = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((task) => task.completed !== true),
      };
    });
  };

  setFilterHandler = (filter) => {
    this.setState({ filter });
  };

  filterForTasks = (tasks, filter) => {
    switch (filter) {
      case 'all': {
        return tasks;
      }
      case 'completed': {
        return tasks.filter((task) => task.completed);
      }
      case 'active': {
        return tasks.filter((task) => !task.completed);
      }
      default: {
        return tasks;
      }
    }
  };

  render() {
    const tasks = this.state.tasks;
    const visibleTasks = this.filterForTasks(tasks, this.state.filter);
    const todoCount = tasks.filter((task) => task.completed !== true).length;
    return (
      <section className="todoapp">
        <Header addTask={this.addTaskHandler} />
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            deleteTask={this.deleteTaskHandler}
            completeTask={this.completeTaskHandler}
            updateTask={this.updateTaskHandler}
          />
          <Footer
            todoCount={todoCount}
            clearCompleted={this.clearCompletedHandler}
            setFilter={this.setFilterHandler}
            currentFilter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}

export default App;
