import React from 'react';

export const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  required = false, 
  placeholder = '',
  disabled = false,
  className = ''
}) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${className}`}
      />
    </div>
  );
};

export default Input;