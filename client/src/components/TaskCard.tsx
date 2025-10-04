// src/components/TaskCard.tsx
import React from 'react';
import { Check, Clock, Edit2, Trash2 } from 'lucide-react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string) => void;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onStatusToggle, onEdit }) => {
  const priorityConfig = {
    high: { label: 'High 🔥', color: 'text-red-600', bg: 'bg-red-50' },
    medium: { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    low: { label: 'Low', color: 'text-green-600', bg: 'bg-green-50' }
  };

  const config = priorityConfig[task.priority];
  const isCompleted = task.status === 'completed';

  return (
    <div className="group bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-sm">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onStatusToggle(task._id)}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
            isCompleted
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          {isCompleted && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-gray-900 mb-1 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <span className={`px-2 py-1 rounded ${config.bg} ${config.color} font-medium`}>
              {config.label}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-green-600">
                <Check className="w-3 h-3" />
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Actions - Hidden until hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 hover:bg-red-100 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;