import React from 'react';

import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import TaskList from '../TaskList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          content: 'For example 1',
          completed: false,
          creationTime: new Date() - 239949,
          id: crypto.randomUUID(),
        },
        {
          content: 'For example 2',
          completed: false,
          creationTime: new Date() - 10000000,
          id: crypto.randomUUID(),
        },
        {
          content: 'For example 3',
          completed: false,
          creationTime: new Date(),
          id: crypto.randomUUID(),
        },
      ],

      filter: 'all',
    };
  }

  setFilterHandler = (filter) => {
    this.setState({ filter });
  };

  filterForTasks = () => {
    const { tasks, filter } = this.state;
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

  updateTaskHandler = (id, newText) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) {
          return { ...task, content: newText };
        }
        return task;
      }),
    }));
  };

  clearCompletedHandler = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.completed !== true),
    }));
  };

  addTaskHandler = (text, ms) => {
    const newTask = {
      content: text,
      completed: false,
      creationTime: new Date(),
      id: crypto.randomUUID(),
      ms: +ms,
      timerFlag: false,
      timerId: null,
    };
    this.setState(({ tasks }) => ({ tasks: [newTask, ...tasks] }));
  };

  deleteTaskHandler = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
    console.log('удалил нафиг задачу');
  };

  completeTaskHandler = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    }));
  };

  updateTimerHandler = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id && task.ms !== undefined) {
          const newTime = task.ms - 1000;
          if (newTime <= 0) {
            clearInterval(task.timerId);
          }
          const timeControl = newTime > 0 ? { ms: newTime } : { ms: 0, timerPlay: false };
          return { ...task, ...timeControl };
        }
        return task;
      }),
    }));
  };

  controllerTimerHandler = (id, key) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) {
          return { ...task, timerFlag: key };
        }
        return task;
      }),
    }));
  };

  updateTimerIdHandler = (id, timerId) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) {
          return { ...task, timerId };
        }
        return task;
      }),
    }));
  };

  render() {
    const { tasks, filter } = this.state;
    const visibleTasks = this.filterForTasks();
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
            updateTimer={this.updateTimerHandler}
            controllerTimer={this.controllerTimerHandler}
            updateTimerId={this.updateTimerIdHandler}
          />
          <Footer
            todoCount={todoCount}
            clearCompleted={this.clearCompletedHandler}
            setFilter={this.setFilterHandler}
            currentFilter={filter}
          />
        </section>
      </section>
    );
  }
}

export default App;
