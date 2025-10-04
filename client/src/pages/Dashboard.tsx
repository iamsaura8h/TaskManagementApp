// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Flag, BarChart3, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
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
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const highPriorityCount = tasks.filter(t => t.priority === 'high' && t.status === 'pending').length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600 text-lg">Stay organized and boost your productivity</p>
        </div>

        {/* Stats Grid - Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">Total</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{tasks.length}</div>
            <div className="text-sm text-gray-600 mt-1">All tasks</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">Active</span>
            </div>
            <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
            <div className="text-sm text-gray-600 mt-1">In progress</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">Done</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">Progress</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">{completionRate}%</div>
            <div className="text-sm text-gray-600 mt-1">Completion rate</div>
          </div>
        </div>

        {/* High Priority Alert */}
        {highPriorityCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Flag className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-red-900">
                You have {highPriorityCount} high priority {highPriorityCount === 1 ? 'task' : 'tasks'} pending
              </p>
              <p className="text-sm text-red-700">Focus on these first to stay on track</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'pending', 'completed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    filter === f
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {f !== 'all' && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      filter === f ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {f === 'pending' ? pendingCount : completedCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filter === 'all' && 'All Tasks'}
                  {filter === 'pending' && 'Pending Tasks'}
                  {filter === 'completed' && 'Completed Tasks'}
                </h2>
                {/* <span className="text-sm text-gray-500">
                  {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                </span> */}
              </div>

              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onStatusToggle={handleStatusToggle}
                    onEdit={() => setEditingTaskId(task._id)}
                  />
                ))
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl text-center py-16">
                  <div className="text-gray-300 mb-4">
                    <Flag className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-sm text-gray-500">
                    {filter !== 'all' 
                      ? `No ${filter} tasks available` 
                      : 'Create your first task to get started'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar - Task Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Create New Task</h2>
                <p className="text-sm text-gray-600">Add a new task to your list</p>
              </div>
              <TaskForm onSubmit={handleCreate} />
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingTaskId && (
          <TaskEditModal
            taskId={editingTaskId}
            onClose={() => setEditingTaskId(null)}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;