import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpPage from './signuppage.js';

// Mock components
jest.mock('../../global-components/footer/footer', () => () => <div>Footer Component</div>);
// jest.mock('../../global-components/navbar1/navbar1.js', () => () => <div>Navbar Component</div>);
jest.mock('./signuppane.js', () => () => <div>SignUpPane Component</div>);

describe('SignUpPage Component', () => {
  test('renders SignUpPage component with SignUpPane and Footer', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    // Check that the SignUpPane component is rendered
    expect(screen.getByText('SignUpPane Component')).toBeInTheDocument();

    // Check that the Footer component is rendered
    expect(screen.getByText('Footer Component')).toBeInTheDocument();

    // Check for the presence of the image
    const image = screen.getByAltText('holding belly');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/e51564f6e1c60c926aff35d378d5aa12.jpg');
  });
});
