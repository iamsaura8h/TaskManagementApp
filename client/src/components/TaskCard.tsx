import React from 'react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onStatusToggle }) => {
  const priorityColors: Record<string, string> = {
    high: 'bg-red-200',
    medium: 'bg-yellow-200',
    low: 'bg-green-200',
  };

  return (
    <div className={`${priorityColors[task.priority]} p-4 rounded mb-2 flex justify-between items-center`}>
      <div>
        <h2 className="font-bold text-lg">{task.title}</h2>
        <p>Due: {task.dueDate}</p>
        <p>Status: {task.status}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onStatusToggle(task._id)} className="px-2 py-1 bg-blue-400 rounded text-white">Toggle</button>
        <button onClick={() => onDelete(task._id)} className="px-2 py-1 bg-red-500 rounded text-white">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
