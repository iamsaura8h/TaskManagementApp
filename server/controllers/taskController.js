import Task from '../models/Task.js';

// ✅ Create Task
export const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, assignedTo: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get Tasks (with pagination)
export const getTasks = async (req, res) => {
  try {
    const pageNum = Number(req.query.page) || 1;
    const limitNum = Number(req.query.limit) || 5;

    const total = await Task.countDocuments({ assignedTo: req.user.id });
    const totalPages = Math.ceil(total / limitNum) || 1;

    if (pageNum > totalPages) {
      return res.json({ tasks: [], total, totalPages });
    }

    const tasks = await Task.find({ assignedTo: req.user.id })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ dueDate: 1 });

    res.json({ tasks, total, totalPages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Task
export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
