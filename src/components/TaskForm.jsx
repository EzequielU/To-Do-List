import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const TaskForm = ({ onAddTask }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === '') {
      toast.error('Por favor, ingresa un nombre válido');
      return;
    }

    const newTaskObject = {
      id: tasks.length + 1,
      name: newTask,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
    onAddTask(newTask);
    setNewTask('');
    toast.success('Nueva Tarea Ingresada');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <form onSubmit={handleAddTask} className="task-form">
      <input
        type="text"
        placeholder="Nueva tarea"
        value={newTask}
        onChange={handleInputChange}
      />
      <button type="submit">Ingresar Tarea</button>
    </form>
  );
};

export default TaskForm;




