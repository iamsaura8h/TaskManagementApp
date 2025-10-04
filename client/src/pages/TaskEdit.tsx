import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import TaskForm from '../components/TaskForm';
import type { Task } from '../types';

const TaskEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Omit<Task, '_id' | 'status'> | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const res = await API.get(`/tasks/${id}`);
      setTask({
        title: res.data.title,
        description: res.data.description,
        dueDate: res.data.dueDate,
        priority: res.data.priority,
      });
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async (updatedTask: Omit<Task, '_id' | 'status'>) => {
    await API.put(`/tasks/${id}`, updatedTask);
    navigate('/dashboard');
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm onSubmit={handleUpdate} initialData={task} />
    </div>
  );
};

export default TaskEdit;
