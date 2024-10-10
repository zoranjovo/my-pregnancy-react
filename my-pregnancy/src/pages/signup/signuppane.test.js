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
});
