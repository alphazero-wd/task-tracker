const Task = require('../models/Task');
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ creatorId: req?.userId });
    return res.status(200).json({
      success: true,
      hits: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = req.body;
    const newTask = await Task.create({ ...task, creatorId: req?.userId });
    return res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Task Cannot Be Empty!' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    const task = await Task.findByIdAndUpdate(id, updatedTask, {
      new: true,
      runValidators: true,
    });
    if (task) {
      return res.status(200).json({
        success: true,
        data: task,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `No Task Found With The ID: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Task Name Cannot Be Empty!',
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (task) {
      task.remove();
      return res.status(200).json({
        success: true,
        data: {},
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `No Task Found With The ID: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
