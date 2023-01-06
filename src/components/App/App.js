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
          content: 'Completed task 1',
          completed: false,
          creationTime: new Date() - 239949,
          id: crypto.randomUUID(),
        },
        {
          content: 'Completed task 2',
          completed: false,
          creationTime: new Date() - 10000000,
          id: crypto.randomUUID(),
        },
        {
          content: 'Active task',
          completed: false,
          creationTime: new Date(),
          id: crypto.randomUUID(),
        },
      ],
    };
    this.addTaskHandler = this.addTaskHandler.bind(this);
    this.deleteTaskHandler = this.deleteTaskHandler.bind(this);
    this.completeTaskHandler = this.completeTaskHandler.bind(this);
  }

  addTaskHandler(task) {
    this.setState(({ tasks }) => {
      return { tasks: [task, ...tasks] };
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
            task.completed = !task.completed;
          }
          return task;
        }),
      };
    });
  }

  render() {
    const tasks = this.state.tasks;
    const addTaskHandler = this.addTaskHandler;
    const deleteTaskHandler = this.deleteTaskHandler;
    const completeTaskHandler = this.completeTaskHandler;
    return (
      <section className="todoapp">
        <Header addTask={addTaskHandler} />
        <section className="main">
          <TaskList
            tasks={tasks}
            deleteTask={deleteTaskHandler}
            completeTask={completeTaskHandler}
          />
          <Footer />
        </section>
      </section>
    );
  }
}

export default App;
