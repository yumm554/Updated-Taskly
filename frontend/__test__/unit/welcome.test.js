import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Welcome from '../../src/components/Welcome';

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    user: {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    },
  }),
}));

describe('Welcome component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    // Check if the username is on the screen
    expect(getByText('Hello testuser!')).toBeInTheDocument();
  });
});
