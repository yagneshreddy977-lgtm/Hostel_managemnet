import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../StatusBadge';

describe('StatusBadge component', () => {
  it('renders status text and default dot', () => {
    render(<StatusBadge value="Resolved" type="status" />);
    expect(screen.getByText('Resolved')).toBeInTheDocument();
  });

  it('applies priority styling class correctly', () => {
    const { container } = render(<StatusBadge value="Critical" type="priority" />);
    const badgeElement = container.querySelector('.badge-priority-critical');
    expect(badgeElement).toBeInTheDocument();
    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  it('applies kebab-cased class for multi-word values like In Progress', () => {
    const { container } = render(<StatusBadge value="In Progress" type="status" />);
    const badgeElement = container.querySelector('.badge-in-progress');
    expect(badgeElement).toBeInTheDocument();
  });
});
