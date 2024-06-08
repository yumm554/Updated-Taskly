import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import UpdateProfile from '../../src/components/UpdateProfile';
import { updateProfile, deleteProfile } from '../../src/handlers/authHandler';

jest.mock('../../src/handlers/authHandler');

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    user: {
      _id: '66604fae1adf85548436f245',
      username: 'testuser',
      email: 'testuser@example.com',
    },
    setUser: jest.fn(),
  }),
}));

describe('Update Profile component', () => {
  it('renders without crashing', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <UpdateProfile />
      </MemoryRouter>
    );

    // Check if the email and password fields are rendered
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  //UPDATE
  it('handles form submission, update profile', async () => {
    updateProfile.mockResolvedValueOnce({
      data: {
        _id: '66604fae1adf85548436f245',
        username: 'testuserupdated',
        email: 'testuser@example.com',
      },
    });

    const { getByLabelText, getByRole, getByText } = render(
      <MemoryRouter>
        <UpdateProfile />
      </MemoryRouter>
    );

    //fill in the form fields
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'testuserupdated' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'testpassword' },
    });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /update/i }));

    // Verify that signup function is called with correct data
    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith('66604fae1adf85548436f245', {
        username: 'testuserupdated',
        password: 'testpassword',
      });
    });

    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(getByText('Updated, successfully')).toBeInTheDocument();
  });

  it('handles form submission with error, update profile', async () => {
    const errorMessage =
      'No valid fields provided for update.' || 'An error occurred';
    updateProfile.mockRejectedValueOnce({ response: { data: errorMessage } });

    const { getByLabelText, getByRole, findByText } = render(
      <MemoryRouter>
        <UpdateProfile />
      </MemoryRouter>
    );

    //fill in the form fields
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'testuserupdated' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'testpassword' },
    });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /update/i }));

    // Verify that signup function is called with correct data
    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith('66604fae1adf85548436f245', {
        username: 'testuserupdated',
        password: 'testpassword',
      });
    });

    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  //DELETE
  it('handles form submission, delete profile', async () => {
    deleteProfile.mockResolvedValueOnce({
      data: 'Profile deleted',
    });

    const { getByRole, getByText } = render(
      <MemoryRouter>
        <UpdateProfile />
      </MemoryRouter>
    );

    // Submit the form
    fireEvent.click(getByRole('button', { name: /delete account/i }));

    // Verify that signup function is called with correct data
    await waitFor(() => {
      expect(deleteProfile).toHaveBeenCalledWith('66604fae1adf85548436f245');
    });

    expect(deleteProfile).toHaveBeenCalledTimes(1);
    expect(getByText('Profile Deleted, Successfully')).toBeInTheDocument();
  });

  it('handles form submission with error, delete profile', async () => {
    const errorMessage = 'No account with this Id' || 'An error occurred';
    deleteProfile.mockRejectedValueOnce({ response: { data: errorMessage } });

    const { getByRole, findByText } = render(
      <MemoryRouter>
        <UpdateProfile />
      </MemoryRouter>
    );

    // Submit the form
    fireEvent.click(getByRole('button', { name: /delete account/i }));

    // Verify that signup function is called with correct data
    await waitFor(() => {
      expect(deleteProfile).toHaveBeenCalledWith('66604fae1adf85548436f245');
    });

    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
