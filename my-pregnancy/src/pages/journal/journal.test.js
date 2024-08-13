import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Journal from './journal.js';
import { format } from 'date-fns';

describe('Journal Component', () => {
  test('renders the journal component', () => {
    render(
      <MemoryRouter>
        <Journal />
      </MemoryRouter>
    );

    expect(screen.getByText(/My Health Journal/i)).toBeInTheDocument();
  });
});
