const Task = require('../models/TaskSchema');

const getAllTask = async (req, res) => {
  try {
    const { email } = req.params;
    const task = await Task.find({ email });
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
    const { name, email, dateCreated } = await req.body;
    if (!name) {
      return res.status(400).json('must provide name');
    }

    const task = await Task.create({ name, email, dateCreated });
    console.log({ task });
    return res.status(200).json(`Added, succesfully`);
  } catch (err) {
    console.log(err);
    return res.status(500).json('An error occurred');
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
      res.status(404).json('task not found');
    }
    res.status(200).json('Saved, succesfully');
  } catch (err) {
    console.log(err);
    return res.status(500).json('An error occurred');
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      res.status(404).json('not found');
    }
    res.status(200).json('success');
  } catch (err) {
    console.log(err);
    return res.status(500).json('error');
  }
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
