import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import UpdateTask from '../../src/components/UpdateTask';
import { updateTask } from '../../src/handlers/tasksHandler';

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

describe('Update Task Component', () => {
  it('renders without crashing', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );

    // Check if the title field is rendered
    expect(getByLabelText(/id/i)).toBeInTheDocument();
    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/completed/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    updateTask.mockResolvedValueOnce({
      data: 'Saved, succesfully',
    });

    const { getByLabelText, getByText, getByRole } = render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );

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
    const errorMessage = 'task not found' || 'An error occurred';
    updateTask.mockRejectedValueOnce({ response: { data: errorMessage } });

    const { getByLabelText, findByText, getByRole } = render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );

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
