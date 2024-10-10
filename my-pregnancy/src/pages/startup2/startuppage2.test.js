import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StartupPage2 from './startuppage2';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('StartupPage2 Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders all sections correctly', () => {
    render(
      <MemoryRouter>
        <StartupPage2 />
      </MemoryRouter>
    );

    expect(screen.getByText(/Start your journey with us today!/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Approach/i)).toBeInTheDocument();
    expect(screen.getByText(/Empowering Your Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/Stay Updated with the Latest Pregnancy Tips and Advice/i)).toBeInTheDocument();
  });
  

  test('navigates to signup page with email query when Subscribe button is clicked with email', () => {
    render(
      <MemoryRouter>
        <StartupPage2 />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const subscribeButton = screen.getByText(/Subscribe/i);
    fireEvent.click(subscribeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/signup?email=test%40example.com');
  });

  test('navigates to signup page without email when Subscribe button is clicked without email', () => {
    render(
      <MemoryRouter>
        <StartupPage2 />
      </MemoryRouter>
    );

    const subscribeButton = screen.getByText(/Subscribe/i);
    fireEvent.click(subscribeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });
});
