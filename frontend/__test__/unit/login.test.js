import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Login from '../../src/components/Login';
import { login } from '../../src/handlers/authHandler';

jest.mock('../../src/handlers/authHandler');

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    user: null,
    setUser: jest.fn(),
    loginBtn: true,
    setLoginBtn: jest.fn(),
  }),
}));

describe('login component', () => {
  it('renders without crashing', () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Check if the email and password fields are rendered
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    login.mockResolvedValueOnce({
      data: {
        _id: '66604fae1adf85548436f245',
        username: 'testuser',
        email: 'user@gmail.com',
      },
    });

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    //fill in the form fields
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'testpassword' },
    });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /login/i }));

    // Verify that signup function is called with correct data
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'testuser@example.com',
        password: 'testpassword',
      });
    });

    expect(login).toHaveBeenCalledTimes(1);
  });

  it('handles form submission with error', async () => {
    const errorMessage = 'User does not exist' || 'Incorrect Password!';
    login.mockRejectedValueOnce({ response: { data: errorMessage } });

    const { getByLabelText, getByRole, findByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    //fill in the form fields
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'testpassword' },
    });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /login/i }));

    // Verify that signup function is called with correct data
    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({
        email: 'testuser@example.com',
        password: 'testpassword',
      })
    );

    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
