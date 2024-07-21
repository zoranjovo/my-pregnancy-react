import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './navbar2.js';

jest.mock('./hamburger.jsx', () => ({ opened, onClick }) => (
  <div data-testid="hamburger" onClick={onClick}>{opened ? 'Open' : 'Closed'}</div>
));

describe('Navbar Component', () => {
  test('renders Navbar and checks initial state of Hamburger menu', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check initial state
    expect(screen.getByTestId('hamburger').textContent).toBe('Closed');
    const consultationLinks = screen.getAllByText('Consultation');
    // The second consultation link should be in the navbarsmallexpand div
    expect(consultationLinks[1].closest('div')).toHaveClass('navbarsmallexpand open');
  });

  test('toggles Hamburger menu on click', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Initial state
    const hamburger = screen.getByTestId('hamburger');
    expect(hamburger.textContent).toBe('Closed');

    // Click to open
    fireEvent.click(hamburger);
    expect(hamburger.textContent).toBe('Open');
    const consultationLinks = screen.getAllByText('Consultation');
    expect(consultationLinks[1].closest('div')).not.toHaveClass('open');

    // Click to close
    fireEvent.click(hamburger);
    expect(hamburger.textContent).toBe('Closed');
    expect(consultationLinks[1].closest('div')).toHaveClass('open');
  });
});
