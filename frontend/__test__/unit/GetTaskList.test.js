import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import GetTaskList from '../../src/components/GetTaskList';

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: () => ({
    setTask: jest.fn(),
  }),
}));

describe('Get Task List Component', () => {
  it('renders without crashing with no tasks', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <GetTaskList data={[]} />
      </MemoryRouter>
    );

    expect(getByText('There are no tasks in your list')).toBeInTheDocument();
  });

  it('renders without crashing with tasks', async () => {
    const data = [
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
    ];
    render(
      <MemoryRouter>
        <GetTaskList data={data} />
      </MemoryRouter>
    );
  });
});
