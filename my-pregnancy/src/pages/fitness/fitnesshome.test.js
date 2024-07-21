import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FitnessHome from './fitnesshome.js';

describe('FitnessHome Component', () => {

  // TODO make this test work
  // test('filters videos based on search term', async () => {
  //   render(
  //     <MemoryRouter>
  //       <FitnessHome />
  //     </MemoryRouter>
  //   );

  //   // Initial state: all videos should be visible
  //   expect(screen.getByText('Relaxing stability ball workout')).toBeInTheDocument();
  //   expect(screen.getByText('Intense cardio session')).toBeInTheDocument();

  //   // Perform search
  //   fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'yoga' } });

  //   // Check results
  //   await waitFor(() => {
  //     expect(screen.getByText('Yoga for beginners')).toBeInTheDocument();
  //   });

  //   // Check that non-matching videos have display: none
  //   expect(screen.getByText('Relaxing stability ball workout').closest('div')).toHaveClass('hidden');
  //   expect(screen.getByText('Intense cardio session').closest('div')).toHaveClass('hidden');
  // });

  test('displays "No videos found" when no videos match search term', () => {
    render(
      <MemoryRouter>
        <FitnessHome />
      </MemoryRouter>
    );

    // Perform search with no matches
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'nonexistent video' } });

    // Check results
    expect(screen.getByText('No videos found')).toBeInTheDocument();
  });
});
