import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'open' });
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchTasks();
  }, [navigate]);

  console.log(newTask)


const handleAddTask = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/tasks', {
      task: newTask  
    });
    setTasks([...tasks, response.data]);
    setNewTask({ title: '', description: '' });
  } catch (error) {
    console.error(error);
  }
};


  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${editTask._id}`, editTask);
      setTasks(tasks.map(task => task._id === editTask._id ? editTask : task));
      setEditTask(null);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-management-container">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task._id}>
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
  
            {userRole === 'admin' && (
              <div className="flex space-x-2 mt-2">
                <button 
                  className="text-blue-500"
                  onClick={() => setEditTask(task)}
                >
                  Edit
                </button>
                <button 
                  className="text-red-500" 
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
  
      {userRole === 'admin' && (
        <>
          <h2 className="text-xl font-bold mt-6">Add New Task</h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <input 
              type="text" 
              placeholder="Title" 
              value={newTask.title} 
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={newTask.description} 
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required 
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" id="add-task-button">
              Add Task
            </button>
          </form>
        </>
      )}
  
      {editTask && (
        <>
          <h2 className="text-xl font-bold mt-6">Edit Task</h2>
          <form onSubmit={handleEditTask} className="space-y-4">
            <input 
              type="text" 
              placeholder="Title" 
              value={editTask.title} 
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              required 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={editTask.description} 
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              required 
            />
            <button type="submit" className="bg-green-500">
              Update Task
            </button>
            <button 
              type="button" 
              onClick={() => setEditTask(null)}
              className="bg-gray-500"
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
  
};

export default TaskManagement;
