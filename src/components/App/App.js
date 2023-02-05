import React from 'react';

import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import TaskList from '../TaskList';

class App extends React.Component {
  timers = {};

  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        // {
        //   content: 'For example 1',
        //   completed: false,
        //   creationTime: new Date() - 239949,
        //   id: crypto.randomUUID(),
        // },
        // {
        //   content: 'For example 2',
        //   completed: false,
        //   creationTime: new Date() - 10000000,
        //   id: crypto.randomUUID(),
        // },
        // {
        //   content: 'For example 3',
        //   completed: false,
        //   creationTime: new Date(),
        //   id: crypto.randomUUID(),
        // },
      ],

      filter: 'all',
    };
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-restricted-syntax
    for (const idTimer of Object.values(this.timers)) {
      clearInterval(idTimer);
    }
  }

  clearTimer = (id) => {
    clearInterval(this.timers[id]);
    delete this.timers[id];
  };

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
    };
    this.timers = { ...this.timers, [newTask.id]: null };
    this.setState(({ tasks }) => ({ tasks: [newTask, ...tasks] }));
  };

  deleteTaskHandler = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  };

  completeTaskHandler = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) {
          this.stopTimer(id);
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    }));
  };

  startTimer = (id) => {
    if (!this.timers[id]) {
      this.timers[id] = setInterval(() => {
        console.log('Я таймер и я всё ещё тикаю, id задачи: ', id);
        this.setState(({ tasks }) => {
          const newTasks = tasks.map((task) => {
            if (task.id === id) {
              let newTime = task.ms - 1000;
              if (newTime <= 0) {
                this.clearTimer(task.id);
                newTime = 0;
              }
              return { ...task, ms: newTime };
            }
            return task;
          });
          return { tasks: newTasks };
        });
      }, 1000);
    }
  };

  stopTimer = (id) => {
    if (this.timers[id]) {
      this.clearTimer(id);
    }
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
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
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
