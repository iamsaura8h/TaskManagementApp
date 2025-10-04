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
};


return (
<form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
<input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-1 w-full" />
<textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-1 w-full" />
<input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="border p-1 w-full" />
<select value={priority} onChange={e => setPriority(e.target.value as "high" | "medium" | "low")} className="border p-1 w-full">
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low">Low</option>
</select>
<button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Submit</button>
</form>
);
};


export default TaskForm;