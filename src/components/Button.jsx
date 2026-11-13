import React from 'react';
import './components.css';

/**
 * Button Component
 * Standard reusable button used throughout the application.
 * 
 * Props:
 * - children: Button text or elements
 * - variant: 'primary' | 'secondary' | 'success' | 'danger' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - icon: Optional icon component to render before text
 * - onClick: Click event handler function
 * - type: 'button' | 'submit' (default: 'button')
 * - disabled: boolean (default: false)
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const buttonClass = `btn btn-${variant} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {IconComponent && <IconComponent size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
