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
});