import { useState, useEffect, useRef } from 'react';

import Footer from '../Footer';
import Header from '../Header';
import TaskList from '../TaskList';
import './App.css';

function App() {
  const timers = useRef();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  useEffect(
    () => () => {
      console.log('Зашли в willmount-useeffect очищаем');
      // eslint-disable-next-line no-restricted-syntax
      for (const idTask of Object.keys(timers)) {
        clearInterval(timers[idTask]);
      }
    },
    []
  );

  const clearTimer = (id) => {
    clearInterval(timers[id]);
    delete timers[id];
  };

  const setFilterHandler = (newFilter) => {
    setFilter(newFilter);
  };

  const filterForTasks = () => {
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

  const updateTaskHandler = (id, newText) => {
    setTasks((oldTasks) =>
      oldTasks.map((task) => {
        if (task.id === id) {
          return { ...task, content: newText };
        }
        return task;
      })
    );
  };

  const clearCompletedHandler = () => {
    setTasks((oldTasks) => oldTasks.filter((task) => task.completed !== true));
  };

  const addTaskHandler = (text, ms) => {
    const newTask = {
      content: text,
      completed: false,
      creationTime: new Date(),
      id: crypto.randomUUID(),
      ms: +ms,
    };
    setTasks((oldTasks) => [newTask, ...oldTasks]);
  };

  const deleteTaskHandler = (id) => {
    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
  };

  const startTimer = (id) => {
    if (!timers[id]) {
      timers[id] = setInterval(() => {
        //  console.log('Я таймер и я всё ещё тикаю, id задачи: ', id);
        setTasks((oldTasks) =>
          oldTasks.map((task) => {
            if (task.id === id) {
              let newTime = task.ms - 1000;
              if (newTime <= 0) {
                clearTimer(task.id);
                newTime = 0;
              }
              return { ...task, ms: newTime };
            }
            return task;
          })
        );
      }, 1000);
    }
  };

  const stopTimer = (id) => {
    if (timers[id]) {
      clearTimer(id);
    }
  };

  const completeTaskHandler = (id) => {
    setTasks((oldTasks) =>
      oldTasks.map((task) => {
        if (task.id === id) {
          stopTimer(id);
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const visibleTasks = filterForTasks();
  const todoCount = tasks.filter((task) => task.completed !== true).length;

  return (
    <section className="todoapp">
      <Header addTask={addTaskHandler} />
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          deleteTask={deleteTaskHandler}
          completeTask={completeTaskHandler}
          updateTask={updateTaskHandler}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          todoCount={todoCount}
          clearCompleted={clearCompletedHandler}
          setFilter={setFilterHandler}
          currentFilter={filter}
        />
      </section>
    </section>
  );
}

export default App;
