import React from 'react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import UpdateTask from '../../src/components/UpdateTask';
import { updateTask, getTask } from '../../src/handlers/tasksHandler';

jest.mock('../../src/handlers/tasksHandler');

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    task: {
      _id: '66604fd81adf85548436f250',
      name: 'testing for adding a task',
      completed: false,
      dateCreated: '08 june 2024',
      email: 'testuser@example.com',
    },
    user: {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    },
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Update Task Component', () => {
  it('renders without crashing and get task initially', async () => {
    useParams.mockReturnValue({ id: '66604fd81adf85548436f250' });

    getTask.mockResolvedValueOnce({
      data: {
        _id: '66604fd81adf85548436f250',
        name: 'testing for fetching a task',
        completed: false,
        dateCreated: '08 june 2024',
        userId: '66604fae1adf85548436f245',
      },
    });

    const { getByLabelText } = render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getTask).toHaveBeenCalledWith('66604fd81adf85548436f250');
    });

    expect(getTask).toHaveBeenCalledTimes(1);
    expect(getByLabelText(/title/i)).toHaveValue('testing for adding a task');

    // Check if the title field is rendered
    expect(getByLabelText(/id/i)).toBeInTheDocument();
    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/completed/i)).toBeInTheDocument();
  });

  it('get task initially with error', async () => {
    useParams.mockReturnValue({ id: '66604fd81adf85548436f250' });

    const errorMessage = 'task not found' || 'An error occurred';
    getTask.mockRejectedValueOnce({ response: { data: errorMessage } });

    const { findByText } = render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getTask).toHaveBeenCalledWith('66604fd81adf85548436f250');
    });

    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    useParams.mockReturnValue({ id: '66604fd81adf85548436f250' });

    getTask.mockResolvedValueOnce({
      data: {
        _id: '66604fd81adf85548436f250',
        name: 'testing for fetching a task',
        completed: false,
        dateCreated: '08 june 2024',
        userId: '66604fae1adf85548436f245',
      },
    });

    updateTask.mockResolvedValueOnce({
      data: 'Saved, succesfully',
    });

    const { getByLabelText, getByText, getByRole } = render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getTask).toHaveBeenCalledWith('66604fd81adf85548436f250');
    });

    //fill in the form fields
    fireEvent.change(getByLabelText(/title/i), {
      target: { value: 'testing for updating a task' },
    });
    fireEvent.click(getByLabelText(/completed/i));

    // Submit the form
    fireEvent.click(getByRole('button', { name: /save/i }));

    // Verify that create task function is called with correct data
    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith('66604fd81adf85548436f250', {
        name: 'testing for updating a task',
        completed: true,
      });
    });

    expect(updateTask).toHaveBeenCalledTimes(1);
    expect(getByText('Saved, succesfully')).toBeInTheDocument();
  });

  it('handles form submission with error', async () => {
    useParams.mockReturnValue({ id: '66604fd81adf85548436f250' });

    getTask.mockResolvedValueOnce({
      data: {
        _id: '66604fd81adf85548436f250',
        name: 'testing for fetching a task',
        completed: false,
        dateCreated: '08 june 2024',
        userId: '66604fae1adf85548436f245',
      },
    });

    const errorMessage = 'task not found' || 'An error occurred';
    updateTask.mockRejectedValueOnce({ response: { data: errorMessage } });

    const { getByLabelText, findByText, getByRole } = render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getTask).toHaveBeenCalledWith('66604fd81adf85548436f250');
    });

    //fill in the form fields
    fireEvent.change(getByLabelText(/title/i), {
      target: { value: 'testing for updating a task' },
    });
    fireEvent.click(getByLabelText(/completed/i));

    // Submit the form
    fireEvent.click(getByRole('button', { name: /save/i }));

    // Verify that create task function is called with correct data
    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith('66604fd81adf85548436f250', {
        name: 'testing for updating a task',
        completed: true,
      });
    });

    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
