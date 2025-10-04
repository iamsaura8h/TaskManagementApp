// src/components/TaskForm.tsx
import React, { useState } from 'react';
import type { Task } from '../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, '_id' | 'status'>) => void;
  initialData?: Omit<Task, '_id' | 'status'>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, priority });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded mb-6 bg-white shadow-sm">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <select value={priority} onChange={e => setPriority(e.target.value as "high" | "medium" | "low")} className="border p-2 w-full rounded">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
