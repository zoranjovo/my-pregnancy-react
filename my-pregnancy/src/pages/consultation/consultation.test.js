import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Consultation from './consultation.js';

describe('Consultation Component', () => {
  test('renders the Consultation Booking form with all fields', () => {
    render(<Consultation />);

    expect(screen.getByLabelText(/Preferred Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reason For Consultation Request/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred Doctor Gender/i)).toBeInTheDocument();
    
    expect(screen.getByLabelText(/Video Call/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Text/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/No Preference/i)).toBeInTheDocument();

    expect(screen.getByText(/Select a Consultant/i)).toBeInTheDocument();
  });

  test('updates state when user interacts with the form fields', () => {
    render(<Consultation />);

    const timeInput = screen.getByLabelText(/Preferred Time/i);
    fireEvent.change(timeInput, { target: { value: '10:00' } });
    expect(timeInput.value).toBe('10:00');

    const dateInput = screen.getByLabelText(/Preferred Date/i);
    fireEvent.change(dateInput, { target: { value: '2023-12-01' } });
    expect(dateInput.value).toBe('2023-12-01');

    const reasonInput = screen.getByLabelText(/Reason For Consultation Request/i);
    fireEvent.change(reasonInput, { target: { value: 'Upset Stomach' } });
    expect(reasonInput.value).toBe('Upset Stomach');

    const genderSelect = screen.getByLabelText(/Preferred Doctor Gender/i);
    fireEvent.change(genderSelect, { target: { value: 'Female' } });
    expect(genderSelect.value).toBe('Female');

    const videoCallRadio = screen.getByLabelText(/Video Call/i);
    fireEvent.click(videoCallRadio);
    expect(videoCallRadio.checked).toBe(true);

    const textRadio = screen.getByLabelText(/Text/i);
    fireEvent.click(textRadio);
    expect(textRadio.checked).toBe(true);

    const noPreferenceRadio = screen.getByLabelText(/No Preference/i);
    fireEvent.click(noPreferenceRadio);
    expect(noPreferenceRadio.checked).toBe(true);
  });

  test('selects a consultant and submits the form', () => {
    render(<Consultation />);

    const consultantRadio = screen.getByLabelText('Select', { selector: 'input[value="1"]' });
    fireEvent.click(consultantRadio);
    expect(consultantRadio.checked).toBe(true);

    const submitButton = screen.getByText(/Book Consultation/i);
    fireEvent.click(submitButton);

    //TODO check submission function is called correctly once it is implemented
  });
});
