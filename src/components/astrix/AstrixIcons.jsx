import React from 'react';

/**
 * Astrix Custom Isometric & Dashboard SVG Icons
 * Exact high-fidelity SVGs adapted from the Astrix Design System.
 */

export function MetricCubeIcon({ className = 'size-4', ...props }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="20"
      height="20"
      {...props}
    >
      <path
        d="M10 2.5L16.25 6.125V13.875L10 17.5L3.75 13.875V6.125L10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 6.125L10 10L3.75 6.125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrendingUpIcon({ className = 'size-3', ...props }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="16"
      height="16"
      {...props}
    >
      <path
        d="M14 4.5L8.5 10L5.5 7L2 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 4.5H14V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExportIcon({ className = 'size-4', ...props }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="18"
      height="18"
      {...props}
    >
      <path
        d="M3.33334 13.3333V15.8333C3.33334 16.2754 3.50894 16.6993 3.8215 17.0118C4.13406 17.3244 4.55798 17.5 5 17.5H15C15.442 17.5 15.866 17.3244 16.1785 17.0118C16.4911 16.6993 16.6667 16.2754 16.6667 15.8333V13.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66666 8.33333L10 11.6667L13.3333 8.33333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11.6667V2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FullscreenIcon({ className = 'size-4', ...props }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="18"
      height="18"
      {...props}
    >
      <path
        d="M2.5 7.5V3.33333C2.5 2.8731 2.8731 2.5 3.33333 2.5H7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 2.5H16.6667C17.1269 2.5 17.5 2.8731 17.5 3.33333V7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 12.5V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PipelineIcon({ className = 'size-4', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="20"
      height="20"
      {...props}
    >
      <path
        d="M6 3V9M18 15V21M3 6H9M15 18H21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9 6C13.9706 6 18 10.0294 18 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

export function CmdKeyIcon({ className = 'size-3.5', ...props }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="14"
      height="14"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 1.5C2.39543 1.5 1.5 2.39543 1.5 3.5C1.5 4.60457 2.39543 5.5 3.5 5.5H5.5V10.5H3.5C2.39543 10.5 1.5 11.3954 1.5 12.5C1.5 13.6046 2.39543 14.5 3.5 14.5C4.60457 14.5 5.5 13.6046 5.5 12.5V10.5H10.5V12.5C10.5 13.6046 11.3954 14.5 12.5 14.5C13.6046 14.5 14.5 13.6046 14.5 12.5C14.5 11.3954 13.6046 10.5 12.5 10.5H10.5V5.5H12.5C13.6046 5.5 14.5 4.60457 14.5 3.5C14.5 2.39543 13.6046 1.5 12.5 1.5C11.3954 1.5 10.5 2.39543 10.5 3.5V5.5H5.5V3.5C5.5 2.39543 4.60457 1.5 3.5 1.5ZM7 5.5H9V10.5H7V5.5ZM3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4H5.5V3.5C5.5 3.22386 5.27614 3 5 3H3.5ZM12.5 3C12.7761 3 13 3.22386 13 3.5C13 3.77614 12.7761 4 12.5 4H10.5V3.5C10.5 3.22386 10.7239 3 11 3H12.5ZM3.5 12C3.22386 12 3 12.2239 3 12.5C3 12.7761 3.22386 13 3.5 13H5V12.5C5 12.2239 4.77614 12 4.5 12H3.5ZM12.5 12C12.7761 12 13 12.2239 13 12.5C13 12.7761 12.7761 13 12.5 13H11C10.7239 13 10.5 12.7761 10.5 12.5V12H12.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
