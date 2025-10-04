// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Task } from '../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, '_id' | 'status'>) => void;
  initialData?: Omit<Task, '_id' | 'status'>;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [isExpanded, setIsExpanded] = useState(!!initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, priority });
    
    // Reset form if not editing
    if (!initialData) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setIsExpanded(false);
      // Reset fields when canceling new task
      if (!initialData) {
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
      }
    }
  };

  // Collapsed state - show "New task" button (only for new tasks, not editing)
  if (!isExpanded && !initialData) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 transition-all"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">New task</span>
      </button>
    );
  }

  // Expanded state - show full form
  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm">
      <input
        type="text"
        placeholder="Task name"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full px-3 py-2 text-base font-medium border-0 focus:outline-none placeholder-gray-400"
        required
        autoFocus={!initialData}
      />
      
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 resize-none"
        rows={3}
        required
      />
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Priority</label>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm font-medium rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;