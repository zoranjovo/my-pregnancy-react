import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DiscussionHome from './discussionhome';

describe('DiscussionHome Component', () => {
  test('renders the discussion home page with correct headings and links', () => {
    render(
      <MemoryRouter>
        <DiscussionHome />
      </MemoryRouter>
    );

    // Check if the breadcrumb links are rendered correctly
    const boardsLink = screen.getByText(/Boards/i);

    // Instead of checking href, ensure the link is in the document
    expect(boardsLink.closest('a')).toBeInTheDocument();
    expect(boardsLink.closest('a')).toHaveAttribute('href', '/forums');
    
    expect(screen.getByText(/General Discussion/i)).toBeInTheDocument();

    // Check if the "Posts" heading and "Sort" options are rendered
    expect(screen.getByText(/Posts/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort/i)).toBeInTheDocument();
  });

  test('renders the posts correctly', () => {
    render(
      <MemoryRouter>
        <DiscussionHome />
      </MemoryRouter>
    );

    expect(screen.getByText(/My experience in last 2 months/i)).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit/i)).toBeInTheDocument();

    expect(screen.getByText(/Lorem ipsum dolor sit amet consectetur adipiscing elit/i)).toBeInTheDocument();
    expect(screen.getByText(/Faucibus et molestie ac feugiat sed lectus/i)).toBeInTheDocument();
  });

  test('renders correct links for the posts', () => {
    render(
      <MemoryRouter>
        <DiscussionHome />
      </MemoryRouter>
    );

    const firstPostLink = screen.getByText(/My experience in last 2 months/i);
    expect(firstPostLink).toHaveAttribute('href', '/post/0');

    const secondPostLink = screen.getByText(/Lorem ipsum dolor sit amet consectetur adipiscing elit/i);
    expect(secondPostLink).toHaveAttribute('href', '/post/1');
  });

  test('renders "Read More" buttons with correct links', () => {
    render(
      <MemoryRouter>
        <DiscussionHome />
      </MemoryRouter>
    );

    const readMoreButtons = screen.getAllByText(/Read More/i);
    expect(readMoreButtons[0].closest('a')).toHaveAttribute('href', '/post/0');
    expect(readMoreButtons[1].closest('a')).toHaveAttribute('href', '/post/1');
  });

  test('renders post information correctly', () => {
    render(
      <MemoryRouter>
        <DiscussionHome />
      </MemoryRouter>
    );

    const postAuthors = screen.getAllByText(/Allie_Verra/i);
    const postDates = screen.getAllByText(/11\/11\/11/i);
    const postViews = screen.getAllByText(/Views/i);
    const postReplies = screen.getAllByText(/replies/i);

    expect(postAuthors[0]).toBeInTheDocument();
    expect(postDates[0]).toBeInTheDocument();
    expect(postViews[0]).toHaveTextContent('1.8k Views');
    expect(postReplies[0]).toHaveTextContent('123 replies');

    expect(postAuthors[1]).toBeInTheDocument();
    expect(postDates[1]).toBeInTheDocument();
    expect(postViews[1]).toHaveTextContent('803 Views');
    expect(postReplies[1]).toHaveTextContent('63 replies');
  });
});
