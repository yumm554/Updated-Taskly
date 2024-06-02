import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import TaskContext from './features/TaskContext';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaskContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TaskContext>
  </React.StrictMode>
);
