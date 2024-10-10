import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FitnessArticle from './fitnessarticle.js';


// Mock FitnessArticle component with param handling
const MockFitnessArticle = ({ id }) => <FitnessArticle id={id} />;

describe('FitnessArticle Component', () => {
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
