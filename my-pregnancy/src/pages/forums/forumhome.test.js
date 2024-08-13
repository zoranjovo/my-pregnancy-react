import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForumHome from './forumhome';

describe('ForumHome Component', () => {
  test('renders the forum home page with correct headings', () => {
    render(
      <MemoryRouter>
        <ForumHome />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to the Forums/i)).toBeInTheDocument();

    expect(screen.getByText(/General Discussion/i)).toBeInTheDocument();
    expect(screen.getByText(/Information Sharing/i)).toBeInTheDocument();
    expect(screen.getByText(/Support Groups/i)).toBeInTheDocument();
  });

  test('renders the top post in General Discussion correctly', () => {
    render(
      <MemoryRouter>
        <ForumHome />
      </MemoryRouter>
    );

    expect(screen.getByText(/My experience in last 2 months/i)).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit/i)).toBeInTheDocument();
  });

  test('renders the top post in Information Sharing correctly', () => {
    render(
      <MemoryRouter>
        <ForumHome />
      </MemoryRouter>
    );

    expect(screen.getByText(/Lorem ipsum dolor sit amet consectetur adipiscing elit/i)).toBeInTheDocument();
    expect(screen.getByText(/Faucibus et molestie ac feugiat sed lectus/i)).toBeInTheDocument();
  });

  test('renders the recommended support group correctly', () => {
    render(
      <MemoryRouter>
        <ForumHome />
      </MemoryRouter>
    );

    expect(screen.getByText(/Gravida neque convallis a cras semper auctor/i)).toBeInTheDocument();
    expect(screen.getByText(/Ut enim blandit volutpat maecenas volutpat blandit aliquam/i)).toBeInTheDocument();
  });

  test('renders correct links in the forum home page', () => {
    render(
      <MemoryRouter>
        <ForumHome />
      </MemoryRouter>
    );

    const generalDiscussionLink = screen.getAllByRole('link', { name: /My experience in last 2 months/i });
    expect(generalDiscussionLink[0]).toHaveAttribute('href', '/post/0');

    const discussionBoardLink = screen.getByRole('link', { name: /General Discussion/i });
    expect(discussionBoardLink).toHaveAttribute('href', '/discussion');
  });
});
