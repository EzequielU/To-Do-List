import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItem = ({ task, onCompleteTask, onEditTask, onDeleteTask }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.name);

  const handleCompleteTask = () => {
    onCompleteTask(task.id);
    toast.success('Tarea Finalizada');
  };

  const handleEditTask = () => {
    setEditing(true);
  };

  const handleSaveTask = () => {
    const trimmedTask = editedTask.trim();
    if (!trimmedTask) {
      toast.error('El Nombre no es Válido');
      return;
    }

    onEditTask(task.id, trimmedTask);
    setEditing(false);
    toast.success('Tarea Modificada');
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
    toast.error('Tarea Eliminada');
  };

  return (
    <div className="task-item">
      <span className={`task-name ${task.completed ? 'completed' : ''}`}>
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        ) : (
          task.name
        )}
      </span>
      <div>
        {!isEditing && (
          <>
            <button onClick={handleCompleteTask} className='buttonItem'>Finalizar</button>
            <button onClick={handleEditTask} className='buttonItem'>Modificar</button>
          </>
        )}
        <button onClick={handleDeleteTask} className='buttonItem buttonItem-danger'>Eliminar</button>
        {isEditing && (
          <button onClick={handleSaveTask} className='buttonItem'>Guardar</button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;



