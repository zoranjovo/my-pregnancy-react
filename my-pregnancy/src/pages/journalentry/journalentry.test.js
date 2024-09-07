import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import JournalEntry from './journalentry.js'; // Adjust the import path as needed

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('JournalEntry Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });
  

  test('renders "New Entry" correctly', () => {
    render(
      <MemoryRouter initialEntries={['/journalentry/new']}>
        <Routes>
          <Route path="/journalentry/:id" element={<JournalEntry />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Journal Entry/i)).toBeInTheDocument();
    expect(screen.getByText(/New Entry/i)).toBeInTheDocument();
  });

  test('renders existing entry correctly', () => {
    render(
      <MemoryRouter initialEntries={['/journalentry/1']}>
        <Routes>
          <Route path="/journalentry/:id" element={<JournalEntry />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Journal Entry/i)).toBeInTheDocument();
    expect(screen.getByText(/Had a productive workday/i)).toBeInTheDocument();
    expect(screen.getByText(/Need to prepare for the meeting/i)).toBeInTheDocument();
  });

  test('handles entry not found', () => {
    render(
      <MemoryRouter initialEntries={['/journalentry/999']}>
        <Routes>
          <Route path="/journalentry/:id" element={<JournalEntry />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Journal entry ID 999 not found/i)).toBeInTheDocument();
  });

  test('allows selecting a mood for a new entry', () => {
    render(
      <MemoryRouter initialEntries={['/journalentry/new']}>
        <Routes>
          <Route path="/journalentry/:id" element={<JournalEntry />} />
        </Routes>
      </MemoryRouter>
    );

    const happyLabel = screen.getByText('Happy');
    const happyCheckbox = happyLabel.previousSibling;
    
    expect(happyCheckbox).toBeInstanceOf(HTMLInputElement);
    expect(happyCheckbox).toHaveAttribute('type', 'checkbox');

    fireEvent.click(happyCheckbox);
    expect(happyCheckbox).toBeChecked();
  });

  test('allows selecting self-care activities for a new entry', () => {
    render(
      <MemoryRouter initialEntries={['/journalentry/new']}>
        <Routes>
          <Route path="/journalentry/:id" element={<JournalEntry />} />
        </Routes>
      </MemoryRouter>
    );

    const breakfastLabel = screen.getByText('Ate Breakfast');
    const breakfastCheckbox = breakfastLabel.previousSibling;

    expect(breakfastCheckbox).toBeInstanceOf(HTMLInputElement);
    expect(breakfastCheckbox).toHaveAttribute('type', 'checkbox');

    fireEvent.click(breakfastCheckbox);
    expect(breakfastCheckbox).toBeChecked();
  });

  test('allows selecting water intake and day rating for a new entry', () => {
    render(
      <MemoryRouter initialEntries={['/journalentry/new']}>
        <Routes>
          <Route path="/journalentry/:id" element={<JournalEntry />} />
        </Routes>
      </MemoryRouter>
    );

    const waterDrop = screen.getByTestId('water-drop-3'); 
    fireEvent.click(waterDrop);
    expect(waterDrop).toHaveClass('selected');

    const dayStar = screen.getByTestId('day-star-5'); 
    fireEvent.click(dayStar);
    expect(dayStar).toHaveClass('selected');
  });

  test('saves a new entry and navigates back to the journal', () => {
    const { debug } = render(
      <MemoryRouter initialEntries={['/journalentry/new']}>
        <Routes>
          <Route path="/journalentry/:id" element={<JournalEntry />} />
        </Routes>
      </MemoryRouter>
    );

    const emoji = screen.getByTestId('emoji');
    fireEvent.click(emoji);
    const waterDrop = screen.getByTestId('water-drop-5'); 
    fireEvent.click(waterDrop);
    const dayStar = screen.getByTestId('day-star-5'); 
    fireEvent.click(dayStar);
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    expect(mockNavigate).toHaveBeenCalledWith('/journal');
  });

});
