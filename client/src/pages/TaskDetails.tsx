// src/pages/TaskDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import type { Task } from '../types';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const res = await API.get(`/tasks/${id}`);
      setTask(res.data);
    };
    fetchTask();
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="mb-2">Description: {task.description}</p>
      <p className="mb-2">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p className="mb-2">Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
    </div>
  );
};

export default TaskDetails;
