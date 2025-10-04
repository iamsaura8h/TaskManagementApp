// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Pagination from '../components/Pagination';
import type { Task } from '../types';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks?page=${page}`);
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const handleStatusToggle = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    await API.put(`/tasks/${id}`, { ...task, status: newStatus });
    setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));
  };

  const handleCreate = async (taskData: Omit<Task, '_id' | 'status'>) => {
    const res = await API.post('/tasks', taskData);
    setTasks([res.data, ...tasks]);
  };

  // Group tasks by priority
  const priorities: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TaskForm onSubmit={handleCreate} />

      {priorities.map(priority => {
        const filteredTasks = tasks.filter(t => t.priority === priority);
        return (
          <div key={priority} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize">{priority} Priority</h2>
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500">No tasks here.</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {filteredTasks.map(task => (
                  <TaskCard key={task._id} task={task} onDelete={handleDelete} onStatusToggle={handleStatusToggle} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Dashboard;
