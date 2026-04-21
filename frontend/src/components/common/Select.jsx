import React from 'react';

export const Select = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false,
  className = ''
}) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`select-field ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;