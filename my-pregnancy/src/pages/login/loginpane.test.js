import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LoginPane from './loginpane.js';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginPane Component', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginPane component', () => {
    render(
      <MemoryRouter>
        <LoginPane />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('navigates to signup page when "Sign up" button is clicked', () => {
    render(
      <MemoryRouter>
        <LoginPane />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Sign up'));
    expect(mockedNavigate).toHaveBeenCalledWith('/signup');
  });

  test('navigates to reset password page when "Forgot password?" button is clicked', () => {
    render(
      <MemoryRouter>
        <LoginPane />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Forgot password?'));
    expect(mockedNavigate).toHaveBeenCalledWith('/resetpassword');
  });


  test('shows error message for invalid inputs', async () => {
    render(
      <MemoryRouter>
        <LoginPane />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '' } });

    fireEvent.click(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(screen.getByText('Please enter your email')).toBeInTheDocument();
    });
  });
});
