import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpPane from './signuppane.js';
import { signUp } from '../../util/apireq';

// Mock the signUp function
jest.mock('../../util/apireq', () => ({
  signUp: jest.fn((firstname, lastname, email, password, callback) => {
    callback({ status: 200 });
  })
}));

describe('SignUpPane Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SignUpPane component correctly', () => {
    render(
      <MemoryRouter>
        <SignUpPane />
      </MemoryRouter>
    );

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText(/I agree with the/i)).toBeInTheDocument();
    expect(screen.getByText('terms and conditions')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('handles signup with valid inputs', async () => {
    render(
      <MemoryRouter>
        <SignUpPane />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/I agree with the/i));

    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith('John', 'Doe', 'john@example.com', 'password123', expect.any(Function));
    });
  });

  test('shows error message for invalid inputs', async () => {
    render(
      <MemoryRouter>
        <SignUpPane />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: '' } });

    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(screen.getByText('Please enter your first name')).toBeInTheDocument();
    });
  });

  // TODO same issue as fitness hidden videos issue
  // test('shows loading indicator while processing', async () => {
  //   render(
  //     <MemoryRouter>
  //       <SignUpPane />
  //     </MemoryRouter>
  //   );

  //   fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
  //   fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'john@example.com' } });
  //   fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  //   fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
  //   fireEvent.click(screen.getByText(/I agree with the/i));

  //   fireEvent.click(screen.getByText('Sign up'));

  //   await waitFor(() => {
  //     expect(screen.queryByText('Sign up')).toHaveClass('stylisedBtn signupBtn hidden');
  //     expect(screen.getByTestId('loading-indicator')).toBeVisible();
  //   });
  // });
});
