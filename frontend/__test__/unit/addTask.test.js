import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import AddTask from '../../src/components/AddTask';
import { createTask } from '../../src/handlers/tasksHandler';

jest.mock('../../src/handlers/tasksHandler');

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    user: {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    },
  }),
}));

describe('Add Task Component', () => {
  it('renders without crashing', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <AddTask />
      </MemoryRouter>
    );

    // Check if the title field is rendered
    expect(getByLabelText(/title/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    createTask.mockResolvedValueOnce({
      data: 'Added, succesfully',
    });

    const { getByLabelText, getByText, getByRole } = render(
      <MemoryRouter>
        <AddTask />
      </MemoryRouter>
    );

    //fill in the form fields
    fireEvent.change(getByLabelText(/title/i), {
      target: { value: 'testing for adding a task' },
    });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /add/i }));

    // Verify that create task function is called with correct data
    await waitFor(() => {
      const date = new Date();
      const formattedDate = date
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
        .replace(/\//g, ' ');
      expect(createTask).toHaveBeenCalledWith({
        name: 'testing for adding a task',
        dateCreated: formattedDate,
        email: 'testuser@example.com',
      });
    });

    expect(createTask).toHaveBeenCalledTimes(1);
    expect(getByText('Added, succesfully')).toBeInTheDocument();
  });

  it('handles form submission with error', async () => {
    const errorMessage = 'must provide name' || 'An error occurred';
    createTask.mockRejectedValueOnce({ response: { data: errorMessage } });

    const { getByLabelText, findByText, getByRole } = render(
      <MemoryRouter>
        <AddTask />
      </MemoryRouter>
    );

    //fill in the form fields
    fireEvent.change(getByLabelText(/title/i), {
      target: { value: 'testing for adding a task' },
    });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /add/i }));

    // Verify that create task function is called with correct data
    await waitFor(() => {
      const date = new Date();
      const formattedDate = date
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
        .replace(/\//g, ' ');
      expect(createTask).toHaveBeenCalledWith({
        name: 'testing for adding a task',
        dateCreated: formattedDate,
        email: 'testuser@example.com',
      });
    });

    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
