// src/components/TaskCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onStatusToggle }) => {
  const navigate = useNavigate();

  const priorityColors: Record<string, string> = {
    high: 'bg-red-200',
    medium: 'bg-yellow-200',
    low: 'bg-green-200',
  };

  return (
    <div
      className={`${priorityColors[task.priority]} p-4 rounded mb-2 flex justify-between items-center shadow-sm hover:shadow-md transition`}
    >
      <div className="flex-1 cursor-pointer" onClick={() => navigate(`/tasks/${task._id}`)}>
        <h2 className="font-bold text-lg">{task.title}</h2>
        <p className="text-sm">Due: {task.dueDate}</p>
        <p className="text-sm">Priority: {task.priority}</p>
        <p className="text-sm">Status: {task.status}</p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onStatusToggle(task._id)}
          className="px-2 py-1 bg-blue-500 rounded text-white text-sm"
        >
          Toggle
        </button>
        <button
          onClick={() => navigate(`/tasks/${task._id}/edit`)}
          className="px-2 py-1 bg-yellow-500 rounded text-white text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-2 py-1 bg-red-500 rounded text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
