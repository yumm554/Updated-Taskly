import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'

import Signup from '../../src/components/Signup'
import { signup } from '../../src/handlers/authHandler'
import { useGlobalContext } from '../../src/features/TaskContext'

jest.mock('../../src/handlers/authHandler')

jest.mock('../../src/features/TaskContext', () => ({
  useGlobalContext: jest.fn(),
}))

describe('Signup Component', () => {
  beforeEach(() => {
    useGlobalContext.mockReturnValue({
      user: {}, // mock user object
      setUser: jest.fn(), // mock setUser function
      loginBtn: false, // mock loginBtn state
      setLoginBtn: jest.fn(), // mock setLoginBtn function
    })
  })

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )
  })

  it('handles form submission', async () => {
    signup.mockResolvedValueOnce({ data: 'Success' })

    const { getByLabelText, getByText, getAllByLabelText } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'testuser@example.com' },
    })
    fireEvent.change(getAllByLabelText(/password/i)[0], {
      target: { value: 'testpassword' },
    })
    fireEvent.change(getAllByLabelText(/password/i)[1], {
      target: { value: 'testpassword' },
    })

    fireEvent.click(getByText(/create account/i))

    await waitFor(() =>
      expect(signup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      })
    )
  })

  it('handles form submission with error', async () => {
    const errorMessage =
      'An error occurred' || 'All fields are required' || 'User already exists'
    signup.mockRejectedValueOnce({ response: { data: errorMessage } })

    const { getByLabelText, getByText, getAllByLabelText, findByText } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'testuser@example.com' },
    })
    fireEvent.change(getAllByLabelText(/password/i)[0], {
      target: { value: 'testpassword' },
    })
    fireEvent.change(getAllByLabelText(/password/i)[1], {
      target: { value: 'testpassword' },
    })

    fireEvent.click(getByText(/create account/i))

    await waitFor(() =>
      expect(signup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      })
    )

    const errorElement = await findByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
  })
})
