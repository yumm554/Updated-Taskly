import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// Import the component you want to test
import Signup from '../../src/components/Signup';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual implementation for other functions
  useNavigate: () => jest.fn(),
}));

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    user: {}, // Provide mock user object here
    setUser: jest.fn(),
    loginBtn: true,
    setLoginBtn: jest.fn(),
  }),
}));

describe('Signup Component', () => {
  it('should render the signup form', () => {
    const { getByLabelText, getByRole } = render(
      <Router>
        <Signup />
      </Router>
    );

    // Check if the username, email, password, confirm password fields are rendered
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('create password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('confirm password')).toBeInTheDocument();
  });
});
