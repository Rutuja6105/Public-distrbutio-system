import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  loading = false, 
  fullWidth = false, 
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${fullWidth ? 'btn-fullwidth' : ''} ${className}`}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;