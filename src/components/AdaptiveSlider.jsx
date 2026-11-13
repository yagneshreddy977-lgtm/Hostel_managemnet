import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './AdaptiveSlider.css';

/**
 * AdaptiveSlider Component
 * Inspired by modern motion-design sliders (e.g., Watermelon / dynamic UI registries).
 * Features:
 * - Spring-physics animated track & thumb using motion
 * - Dynamic color gradient shift based on slider percentage
 * - Animated number transitions on value change
 * - Dual color schemes: 'standard' (green -> amber -> red) & 'capacity' (red -> amber -> green)
 * - Accessible native range input overlay
 * 
 * Props:
 * - value: controlled numeric value
 * - min: minimum range (default: 0)
 * - max: maximum range (default: 100)
 * - step: step increment (default: 1)
 * - defaultValue: initial fallback value
 * - onChange: callback when value changes (newVal) => void
 * - label: header title (e.g., "Max SLA Deadline", "Minimum Free Hours")
 * - unit: unit suffix (e.g., "hrs", "pts", "%")
 * - variant: 'card' | 'compact' (default: 'compact')
 * - colorScheme: 'standard' | 'capacity' | 'emerald' | 'amber'
 * - onReset: optional callback to reset / clear filter
 * - isFiltered: boolean indicating if filter is currently active
 */
export function AdaptiveSlider({
  value,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
  label = 'Value Slider',
  unit = '',
  variant = 'compact',
  colorScheme = 'standard',
  onReset,
  isFiltered = true,
  className = '',
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  // Compute percentage (0 to 100)
  const range = max - min > 0 ? max - min : 1;
  const percentage = Math.min(100, Math.max(0, ((currentValue - min) / range) * 100));

  // Determine dynamic gradient and text color based on percentage & scheme
  const colorSettings = useMemo(() => {
    const ratio = percentage / 100;

    if (colorScheme === 'capacity') {
      // For technician capacity / free hours: Low hours = danger red, High hours = success green
      if (ratio < 0.3) {
        return {
          text: '#EF4444',
          gradient: 'linear-gradient(90deg, #F87171, #EF4444)',
          thumbBorder: '#EF4444',
          thumbDot: '#EF4444',
        };
      } else if (ratio < 0.65) {
        return {
          text: '#F59E0B',
          gradient: 'linear-gradient(90deg, #FBBF24, #F59E0B)',
          thumbBorder: '#F59E0B',
          thumbDot: '#F59E0B',
        };
      } else {
        return {
          text: '#10B981',
          gradient: 'linear-gradient(90deg, #34D399, #10B981)',
          thumbBorder: '#10B981',
          thumbDot: '#10B981',
        };
      }
    }

    // Default 'standard' (green -> amber -> red) e.g., for urgency or SLA demand
    if (ratio < 0.35) {
      return {
        text: '#10B981',
        gradient: 'linear-gradient(90deg, #10B981, #06B6D4)',
        thumbBorder: '#10B981',
        thumbDot: '#10B981',
      };
    } else if (ratio < 0.7) {
      return {
        text: '#F59E0B',
        gradient: 'linear-gradient(90deg, #F59E0B, #F97316)',
        thumbBorder: '#F59E0B',
        thumbDot: '#F59E0B',
      };
    } else {
      return {
        text: '#EF4444',
        gradient: 'linear-gradient(90deg, #F43F5E, #8B5CF6)',
        thumbBorder: '#EF4444',
        thumbDot: '#EF4444',
      };
    }
  }, [percentage, colorScheme]);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setInternalValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  const containerClass = variant === 'card' 
    ? `adaptive-slider-card ${className}` 
    : `adaptive-slider-compact ${className}`;

  // 7 evenly spaced background track dots
  const dots = useMemo(() => Array.from({ length: 7 }), []);

  return (
    <div className={containerClass}>
      {/* Header with Label & Animated Value */}
      <div className="adaptive-slider-header">
        <span className="adaptive-slider-label">{label}</span>

        <div className="adaptive-slider-value-group">
          <div className="adaptive-slider-digits" style={{ color: colorSettings.text }}>
            <AnimatedDigits value={currentValue} />
          </div>
          {unit && <span className="adaptive-slider-unit">{unit}</span>}
        </div>
      </div>

      {/* Interactive Slider Track */}
      <div className="adaptive-slider-track-wrap">
        <div className="adaptive-slider-track">
          {/* Subtle dots across track */}
          <div className="adaptive-slider-dots-container">
            {dots.map((_, i) => (
              <div key={i} className="adaptive-slider-dot" />
            ))}
          </div>

          {/* Spring-animated gradient progress fill */}
          <motion.div
            className="adaptive-slider-fill"
            animate={{
              width: `${percentage}%`,
              background: colorSettings.gradient,
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          />

          {/* Accessible HTML5 Native Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleSliderChange}
            className="adaptive-slider-native-input"
            aria-label={label}
          />

          {/* Spring-animated Thumb */}
          <motion.div
            className="adaptive-slider-thumb"
            animate={{
              left: `calc((${percentage} / 100) * (100% - ${variant === 'card' ? 28 : 24}px))`,
              borderColor: colorSettings.thumbBorder,
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div
              className="adaptive-slider-thumb-dot"
              style={{ backgroundColor: colorSettings.thumbDot }}
            />
          </motion.div>
        </div>
      </div>

      {/* Footer Range Labels & Quick Reset Button */}
      <div className="adaptive-slider-footer">
        <span>{min} {unit}</span>
        {onReset && (
          <button
            type="button"
            className="adaptive-slider-reset-btn"
            onClick={onReset}
          >
            {isFiltered ? '✕ Reset Filter' : 'All Values'}
          </button>
        )}
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

/**
 * AnimatedDigits Component
 * Smoothly pops and shifts single digits using Framer Motion
 */
function AnimatedDigits({ value }) {
  const str = String(value);

  return (
    <div style={{ display: 'inline-flex', overflow: 'hidden' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        {str.split('').map((char, index) => (
          <motion.span
            key={index + '-' + char}
            initial={{ opacity: 0, y: -8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 24,
            }}
            style={{ display: 'inline-block' }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default AdaptiveSlider;
