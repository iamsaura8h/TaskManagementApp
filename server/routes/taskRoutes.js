import express from 'express';
import Task from '../models/Task.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
  const task = new Task({ ...req.body, assignedTo: req.user.id });
  await task.save();
  res.json(task);
});

// Get Tasks with pagination
router.get('/', auth, async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const tasks = await Task.find({ assignedTo: req.user.id })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ dueDate: 1 });
  const total = await Task.countDocuments({ assignedTo: req.user.id });
  res.json({ tasks, total });
});

// Get Task by ID
router.get('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

// Update Task
router.put('/:id', auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
