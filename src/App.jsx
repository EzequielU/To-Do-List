import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const addTask = (newTask) => {
    updateTasks([...tasks, { id: tasks.length + 1, name: newTask, completed: false }]);
  };

  const completeTask = (taskId) => {
    updateTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const editTask = (taskId, newName) => {
    updateTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, name: newName } : task))
    );
  };

  const deleteTask = (taskId) => {
    updateTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="app border-2 border-primary rounded-xl shadow-lg bg-white p-4 my-4">
      <h1 style={{ color: '#5c33a2' }} className="text-3xl font-bold mb-2">To Do List</h1>
      <h2 style={{ color: '#2196f3' }} className="text-xl font-semibold mb-4">Tareas a Realizar</h2>


      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onCompleteTask={completeTask}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
        className="mt-4"
      />
      <ToastContainer position="top-right" hideProgressBar="true" />
    </div>
  );
};

export default App;


