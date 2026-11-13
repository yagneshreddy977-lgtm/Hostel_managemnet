import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdaptiveSlider } from '../AdaptiveSlider';

describe('AdaptiveSlider component', () => {
  it('renders label, unit, and value digits properly', () => {
    const { container } = render(
      <AdaptiveSlider
        label="Maximum SLA Hours"
        unit="hrs"
        min={2}
        max={48}
        value={12}
      />
    );

    expect(screen.getByText('Maximum SLA Hours')).toBeInTheDocument();
    expect(container.querySelector('.adaptive-slider-digits')).toHaveTextContent('12');
    expect(screen.getAllByText(/hrs/i).length).toBeGreaterThanOrEqual(1);
  });

  it('triggers onChange callback when range slider value changes', () => {
    const handleChange = vi.fn();

    render(
      <AdaptiveSlider
        label="Capacity Filter"
        unit="h"
        min={0}
        max={8}
        value={4}
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('slider', { name: 'Capacity Filter' });
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('4');

    fireEvent.change(input, { target: { value: '6' } });
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('renders and triggers onReset when provided', () => {
    const handleReset = vi.fn();

    render(
      <AdaptiveSlider
        label="Shift Capacity"
        min={0}
        max={10}
        value={5}
        onReset={handleReset}
        isFiltered={true}
      />
    );

    const resetBtn = screen.getByRole('button', { name: /Reset Filter/i });
    expect(resetBtn).toBeInTheDocument();

    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
