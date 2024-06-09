const express = require('express');
const app = express();
const dbConnect = require('./db/dbConnect');
const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || '3001';
require('dotenv').config();
const cors = require('cors');
// const corsOptions = {
//   origin: [
//     '*',
//     'https://task-management-app-931f.onrender.com',
//     'https://taskly-1t37.onrender.com',
//   ],
// };

dbConnect();

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.use('/api/v1/tasks', require('./routes/tasksRoutes'));
app.use('/api/v1/tasks/all', require('./routes/getAllTasksRoute'));
app.use('/api/v1/login', require('./routes/loginRoute'));
app.use('/api/v1/signup', require('./routes/signupRoute'));
app.use('/api/v1/updateProfile', require('./routes/updateProfileRoute'));
app.use('/api/v1/deleteProfile', require('./routes/deleteProfileRoute'));

mongoose.connection.once('open', () => {
  console.log('connected to database');
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
