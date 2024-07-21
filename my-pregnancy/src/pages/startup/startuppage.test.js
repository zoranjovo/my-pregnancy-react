import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import StartupPage from './startuppage.js';

describe('StartupPage', () => {
  test('renders StartupPage and checks for main elements', () => {
    render(
      <MemoryRouter>
        <StartupPage />
      </MemoryRouter>
    );

    // Check if Navbar is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Check for the main heading
    expect(screen.getByText('My Pregnancy, the ... (someone put some words here)')).toBeInTheDocument();

    // Check for the Join us today heading
    const joinUsHeadings = screen.getAllByText('Join us today!');
    expect(joinUsHeadings[0]).toBeInTheDocument();
    expect(joinUsHeadings[1]).toBeInTheDocument();

    // Check for the Signup button
    expect(screen.getAllByText('Sign up')[0]).toBeInTheDocument();
  });

  test('navigates to signup page without email', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <StartupPage />
      </Router>
    );

    fireEvent.click(screen.getAllByText('Sign up')[0]);
    expect(history.location.pathname).toBe('/signup');
  });

  test('navigates to signup page with email', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <StartupPage />
      </Router>
    );

    const emailInput = screen.getAllByPlaceholderText('Email')[0];
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getAllByText('Sign up')[0]);
    expect(history.location.pathname).toBe('/signup');
    expect(history.location.search).toBe('?email=test%40example.com');
  });

  test('navigates to signup page on Enter key press', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <StartupPage />
      </Router>
    );

    const emailInput = screen.getAllByPlaceholderText('Email')[0];
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.keyPress(emailInput, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(history.location.pathname).toBe('/signup');
    expect(history.location.search).toBe('?email=test%40example.com');
  });

  test('renders testimonials and checks for text', () => {
    render(
      <MemoryRouter>
        <StartupPage />
      </MemoryRouter>
    );

    // Check for Testimonials heading
    expect(screen.getByText('Testimonials')).toBeInTheDocument();

    // Check for individual testimonials
    expect(screen.getByText('Love the community!')).toBeInTheDocument();
    expect(screen.getByText('One of the best platforms')).toBeInTheDocument();
  });

  test('renders points and checks for list items', () => {
    render(
      <MemoryRouter>
        <StartupPage />
      </MemoryRouter>
    );

    // Check for list items
    expect(screen.getByText('Pregnancy Guides')).toBeInTheDocument();
    expect(screen.getByText('Nutrition Tips')).toBeInTheDocument();
    expect(screen.getByText('Exercise Plans')).toBeInTheDocument();
    expect(screen.getByText('Mental Health Support')).toBeInTheDocument();
  });
});
