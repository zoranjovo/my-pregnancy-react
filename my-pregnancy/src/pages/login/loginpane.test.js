import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  test('logs email and password when login button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    render(
      <MemoryRouter>
        <LoginPane />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Sign in'));
    expect(consoleSpy).toHaveBeenCalledWith('test@example.com', 'password123');

    consoleSpy.mockRestore();
  });
});
