const Task = require('../models/Task');

const getAllTask = async (req, res) => {
  try {
    const { username } = req.params;
    const task = await Task.find({ username });
    console.log(username);
    if (!task) {
      res.status(200).json([]);
    }
    res.json(task);
  } catch (err) {
    console.log(err);
  }
};

const createTask = async (req, res) => {
  try {
    const { name, username } = await req.body;
    if (!name) {
      res.status(400).json({ message: 'must provide name' });
    }

    const task = await Task.create({ name, username });
    res.status(200).json({ message: `Task created` });
  } catch (err) {
    console.log(err);
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body);
    if (!task) {
      res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json('Task updated');
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json('Task deleted');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
