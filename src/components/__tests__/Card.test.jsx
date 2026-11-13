import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card component', () => {
  it('renders title, subtitle, and body children', () => {
    render(
      <Card title="Department Statistics" subtitle="Weekly overview of maintenance">
        <p>Card body content here</p>
      </Card>
    );

    expect(screen.getByText('Department Statistics')).toBeInTheDocument();
    expect(screen.getByText('Weekly overview of maintenance')).toBeInTheDocument();
    expect(screen.getByText('Card body content here')).toBeInTheDocument();
  });

  it('renders top-right action element when provided', () => {
    render(
      <Card title="Shift Load" action={<button>Refresh</button>}>
        <div>Body</div>
      </Card>
    );

    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });
});
