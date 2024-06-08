import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';

import Task from '../../src/components/Task';
import { deleteTask } from '../../src/handlers/tasksHandler';

jest.mock('../../src/handlers/tasksHandler');

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    setTask: jest.fn(),
    getAgain: false,
    setGetAgain: jest.fn(),
  }),
}));

describe('Task Component', () => {
  it('renders without crashing', async () => {
    const task = {
      _id: '66604fd81adf85548436f250',
      name: 'task 1',
      completed: false,
      dateCreated: '08 june 2024',
      email: 'testuser@example.com',
    };

    const { getByLabelText } = render(
      <MemoryRouter>
        <Task {...task} />
      </MemoryRouter>
    );

    expect(getByLabelText(/edit task/i)).toBeInTheDocument();
    expect(getByLabelText(/delete task/i)).toBeInTheDocument();
  });

  it('delete task with delete button, handling success', async () => {
    deleteTask.mockResolvedValueOnce({
      data: 'success',
    });

    const task = {
      _id: '66604fd81adf85548436f250',
      name: 'task 1',
      completed: false,
      dateCreated: '08 june 2024',
      email: 'testuser@example.com',
    };

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Task {...task} />
      </MemoryRouter>
    );

    // click the delete button
    fireEvent.click(getByLabelText(/delete task/i));

    // Verify that delete task function is called with correct data
    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith('66604fd81adf85548436f250');
    });

    expect(deleteTask).toHaveBeenCalledTimes(1);
    expect(getByText('success')).toBeInTheDocument();
  });

  it('delete task with delete button, handling error', async () => {
    const errorMessage = 'error' || 'not found';
    deleteTask.mockRejectedValueOnce({ response: { data: errorMessage } });

    const task = {
      _id: '66604fd81adf85548436f250',
      name: 'task 1',
      completed: false,
      dateCreated: '08 june 2024',
      email: 'testuser@example.com',
    };

    const { getByLabelText, findByText } = render(
      <MemoryRouter>
        <Task {...task} />
      </MemoryRouter>
    );

    // click the delete button
    fireEvent.click(getByLabelText(/delete task/i));

    // Verify that delete task function is called with correct data
    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith('66604fd81adf85548436f250');
    });

    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
