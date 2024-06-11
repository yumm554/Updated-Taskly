import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';

import TaskList from '../../src/components/TaskList';
import { accessAllTasks } from '../../src/handlers/tasksHandler';

jest.mock('../../src/handlers/tasksHandler');

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    user: {
      _id: '66604fae1adf85548436f245',
      username: 'testuserupdated',
      email: 'testuser@example.com',
    },
    getAgain: false,
    setGetAgain: jest.fn(),
    welcome: true,
    setWelcome: jest.fn(),
  }),
}));

describe('Task List Component', () => {
  it('renders without crashing and access all tasks', async () => {
    accessAllTasks.mockResolvedValueOnce(
      [
        {
          _id: '66604fd81adf85548436f250',
          name: 'task 1',
          completed: false,
          dateCreated: '08 june 2024',
          email: 'testuser@example.com',
        },
        {
          _id: '66604ff91adf85548436f257',
          name: 'task 2',
          completed: true,
          dateCreated: '08 june 2024',
          email: 'testuser@example.com',
        },
      ] || []
    );
    render(
      <MemoryRouter>
        <TaskList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(accessAllTasks).toHaveBeenCalledWith('66604fae1adf85548436f245');
    });
  });
});
