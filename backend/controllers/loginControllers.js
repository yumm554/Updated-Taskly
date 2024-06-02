const Login = require('../models/Login');
const Task = require('../models/Task');

const getlogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const find = await Login.findOne({ username });
    if (!find) {
      res.status(400).json('No account exists with this username');
    }
    const login = await Login.findOne({ username, password });
    if (!login) {
      res.status(400).json('Username or password does not match');
    }
    res.status(200).json(login);
  } catch (err) {
    console.log(err);
  }
};

const createlogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json('all fields are required');
    }
    const duplicate = await Login.findOne({ username });
    if (duplicate) {
      res.status(400).json('duplicate username');
    }
    const login = await Login.create({ username, password });
    res.status(200).json('Signed up successfully');
  } catch (err) {
    console.log(err);
  }
};

const updatelogin = async (req, res) => {
  try {
    const { username: name } = req.params;
    console.log(name);
    const { username, password } = req.body;
    const login = await Login.findOneAndUpdate(
      { username: name },
      { username, password },
      { new: true }
    );

    if (!login) res.status(400).json('not found');
    res.status(200).json(login);
    const task = await Task.updateMany(
      { username: name },
      { $set: { username } }
    );
    console.log(task);
  } catch (err) {
    console.log(err);
  }
};

const deletelogin = async (req, res) => {
  try {
    const { username } = req.body;
    const login = await Login.findOneAndDelete({ username: username });
    if (!login) {
      res.json('no account with this username');
    }
    res.json('deleted');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getlogin, createlogin, updatelogin, deletelogin };
