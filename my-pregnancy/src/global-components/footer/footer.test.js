import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Footer from './footer.js';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Footer Component', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Footer component', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Follow us on')).toBeInTheDocument();
    expect(screen.getByText('Wollongong, New South Wales - 2500')).toBeInTheDocument();
    expect(screen.getByText('support@prega.com.au')).toBeInTheDocument();
  });

  test('navigates to correct pages on button click', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('About Us'));
    expect(mockedNavigate).toHaveBeenCalledWith('/about');

    fireEvent.click(screen.getByText('Privacy Policy'));
    expect(mockedNavigate).toHaveBeenCalledWith('/privacypolicy');

    fireEvent.click(screen.getByText('FAQ'));
    expect(mockedNavigate).toHaveBeenCalledWith('/faq');

    fireEvent.click(screen.getByText('Contact Us'));
    expect(mockedNavigate).toHaveBeenCalledWith('/contact');

    fireEvent.click(screen.getByText('Join Now!'));
    expect(mockedNavigate).toHaveBeenCalledWith('/signup');
  });

  test('renders social media links with correct href', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByAltText('facebook').closest('a')).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61565667462464&sk=about');
    expect(screen.getByAltText('instagram').closest('a')).toHaveAttribute('href', 'https://instagram.com');
    expect(screen.getByAltText('linkedin').closest('a')).toHaveAttribute('href', 'https://linkedin.com');
  });
});
