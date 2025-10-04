// src/components/TaskEditModal.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
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
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
          title="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Task</h2>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading task...</p>
              </div>
            </div>
          ) : (
            <TaskForm 
              onSubmit={handleSubmit} 
              initialData={initialData ?? undefined}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;