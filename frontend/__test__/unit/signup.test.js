import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import Signup from '../../src/components/Signup';
import { signup } from '../../src/handlers/authHandler';

jest.mock('../../src/handlers/authHandler');

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    user: null,
    setUser: jest.fn(),
    loginBtn: true,
    setLoginBtn: jest.fn(),
  }),
}));

describe('Signup Component', () => {
  it('renders without crashing', () => {
    const { getByLabelText, getAllByLabelText, getByRole } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Check if the email and password fields are rendered
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getAllByLabelText(/password/i)[0]).toBeInTheDocument();
    expect(getAllByLabelText(/password/i)[1]).toBeInTheDocument();
    expect(
      getByRole('button', { name: /create account/i })
    ).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    signup.mockResolvedValueOnce({ data: 'Signed up successfully' });

    const { getByLabelText, getByText, getByRole, getAllByLabelText } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    //fill in the form fields
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(getAllByLabelText(/password/i)[0], {
      target: { value: 'testPassword4' },
    });
    fireEvent.change(getAllByLabelText(/password/i)[1], {
      target: { value: 'testPassword4' },
    });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /create account/i }));

    // Verify that signup function is called with correct data
    await waitFor(() =>
      expect(signup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testPassword4',
      })
    );

    expect(signup).toHaveBeenCalledTimes(1);
    expect(getByText('Signed up successfully')).toBeInTheDocument();
  });

  it('handles form submission with error', async () => {
    const errorMessage =
      'An error occurred' || 'All fields are required' || 'User already exists';
    signup.mockRejectedValueOnce({ response: { data: errorMessage } });

    const { getByLabelText, getByRole, getAllByLabelText, findByText } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    //fill in the form fields
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(getAllByLabelText(/password/i)[0], {
      target: { value: 'testPassword4' },
    });
    fireEvent.change(getAllByLabelText(/password/i)[1], {
      target: { value: 'testPassword4' },
    });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /create account/i }));

    // Verify that signup function is called with correct data
    await waitFor(() =>
      expect(signup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testPassword4',
      })
    );

    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
