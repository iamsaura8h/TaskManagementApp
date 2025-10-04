// src/components/TaskEditModal.tsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import TaskForm from './TaskForm';
import type { Task } from '../types';

interface TaskEditModalProps {
  taskId: string | null;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ taskId, onClose, onUpdate }) => {
  const [initialData, setInitialData] = useState<Omit<Task, '_id' | 'status'> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        setLoading(true);
        try {
          const res = await API.get(`/tasks/${taskId}`);
          setInitialData({
            title: res.data.title,
            description: res.data.description,
            dueDate: res.data.dueDate,
            priority: res.data.priority,
          });
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async (updated: Omit<Task, '_id' | 'status'>) => {
    if (!taskId) return;
    try {
      const res = await API.put(`/tasks/${taskId}`, updated);
      onUpdate(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!taskId) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative animate-in fade-in zoom-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Edit Task</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading task...</p>
        ) : (
          <TaskForm onSubmit={handleSubmit} initialData={initialData ?? undefined} />
        )}
      </div>
    </div>
  );
};

export default TaskEditModal;
