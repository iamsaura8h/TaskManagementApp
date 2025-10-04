// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskEditModal from '../components/TaskEditModal';
import Pagination from '../components/Pagination';
import type { Task } from '../types';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const fetchTasks = async (targetPage = page) => {
    try {
      const res = await API.get(`/tasks?page=${targetPage}`);
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages || 1);

      // Prevent showing empty pages if user goes beyond totalPages
      if (targetPage > (res.data.totalPages || 1)) {
        setPage(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks(page);
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
    const res = await API.put(`/tasks/${id}`, { ...task, status: newStatus });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
  };

  const handleCreate = async (taskData: Omit<Task, '_id' | 'status'>) => {
    const res = await API.post('/tasks', taskData);
    setTasks([res.data, ...tasks]);
  };

  const handleUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <TaskForm onSubmit={handleCreate} />
      <div className="mt-6 space-y-3">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onStatusToggle={handleStatusToggle}
              onEdit={() => setEditingTaskId(task._id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No tasks found</p>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {editingTaskId && (
        <TaskEditModal
          taskId={editingTaskId}
          onClose={() => setEditingTaskId(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
