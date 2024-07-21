import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FitnessArticle from './fitnessarticle.js';

// Mock videos array for testing
const videos = [
  { name: 'Relaxing stability ball workout', desc: 'Relax with this stability ball workout that combines gentle movements to relieve stress and improve flexibility and core strength.', url: 'uznqUmKBDVw', time: '20 min' },
  { name: 'Intense cardio session', desc: 'Boost your cardiovascular fitness with this high-energy cardio session, perfect for burning calories and improving stamina.', url: 'T6_cRgYN40s', time: '30 min' },
  { name: 'Yoga for beginners', desc: 'A gentle introduction to yoga, focusing on basic poses and techniques to improve flexibility, strength, and balance.', url: 'v7AYKMP6rOE', time: '15 min' }
];

// Mock FitnessArticle component with param handling
const MockFitnessArticle = ({ id }) => <FitnessArticle id={id} />;

describe('FitnessArticle Component', () => {
  test('renders correctly with a valid video ID', () => {
    render(
      <MemoryRouter initialEntries={['/fitnessarticle/v7AYKMP6rOE']}>
        <Routes>
          <Route path="/fitnessarticle/:id" element={<MockFitnessArticle id="v7AYKMP6rOE" />} />
        </Routes>
      </MemoryRouter>
    );

    // Check that both headings are present
    const headings = screen.getAllByText('Yoga for beginners');
    expect(headings).toHaveLength(2);

    // Check for the iframe
    expect(screen.getByTitle('YouTube video player')).toBeInTheDocument();
  });

  test('renders "Invalid video ID" for an invalid video ID', () => {
    render(
      <MemoryRouter initialEntries={['/fitnessarticle/invalidID']}>
        <Routes>
          <Route path="/fitnessarticle/:id" element={<MockFitnessArticle id="invalidID" />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Invalid video ID')).toBeInTheDocument();
  });

  test('renders back button link correctly', () => {
    render(
      <MemoryRouter initialEntries={['/fitnessarticle/v7AYKMP6rOE']}>
        <Routes>
          <Route path="/fitnessarticle/:id" element={<MockFitnessArticle id="v7AYKMP6rOE" />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('← All Videos')).toBeInTheDocument();
  });
});
