import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.js';

// mock useScrollToTop
jest.mock('./global-components/scrollToTop', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// mock pages
// jest.mock('./pages/home/homepage', () => () => <div>Home Page</div>);



describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App/>);
  });

  test('renders startup page on root route', () => {
    render(<App/>);
    expect(screen.getByText('Your trusted community for support, sharing, and knowledge during pregnancy.')).toBeInTheDocument();
  });

  test('renders home page on /home route', () => {
    window.history.pushState({}, 'Test page', '/home');
    render(<App/>);
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  test('renders not found page for unknown route', () => {
    window.history.pushState({}, 'Test page', '/example-of-a-route-that-definitely-does-not-exit');
    render(<App/>);
    expect(screen.getByText('404 not found')).toBeInTheDocument();
  });
});