import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './loginpage.js';

// Mock components
jest.mock('../../global-components/footer/footer', () => () => <div>Footer Component</div>);
// jest.mock('../../global-components/navbar1/navbar1.js', () => () => <div>Navbar Component</div>);
jest.mock('./loginpane.js', () => () => <div>LoginPane Component</div>);

describe('LoginPage Component', () => {
  test('renders LoginPage component with LoginPane and Footer', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Check that the LoginPane component is rendered
    expect(screen.getByText('LoginPane Component')).toBeInTheDocument();

    // Check that the Footer component is rendered
    expect(screen.getByText('Footer Component')).toBeInTheDocument();

    // Check for the presence of the image
    const image = screen.getByAltText('holding belly');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/e51564f6e1c60c926aff35d378d5aa12.jpg');
  });
});
