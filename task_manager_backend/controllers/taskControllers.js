const Task = require('../models/Task');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const createTaskController = async (req,res) => {
    const {title, description, status} = req.body;
        try {
            const task = await Task.create({title, description, status, createdBy: req.user._id});
            res.status(201).json(task);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: "Server error"})
        }
}

const getAllTasksController = async (req,res) => {
    const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const skip = (page - 1) * limit;
  try {
    const total = await Task.countDocuments();
    const tasks = await Task.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    return res.json({ tasks, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('GET /api/tasks error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

const getTaskByIdController = async (req,res) => {
    try {
            const task = await Task.findById(req.params.id).lean();
            if (!task) return res.status(404).json({ message: 'Task not found'});
            res.json(task);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'Server error'});
        }
}

const updateTaskController = async (req, res) => {
    try {
            const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean();
            if(!updated) return res.status(404).json({message: 'Task not found'});
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'Server error'})
        }
}

const deleteTaskController = async (req,res) => {
    try {
            const deleted = await Task.findByIdAndDelete(req.params.id).lean();
            if(!deleted) return res.status(404).json({message: 'Task not found'});
            res.json({messgae: 'Deleted Successfully'})
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'Server error'})
        }
}

module.exports = {createTaskController, getAllTasksController, getTaskByIdController, updateTaskController, deleteTaskController}