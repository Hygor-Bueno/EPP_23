import React, { useState } from 'react';
import { SelectContainer, SelectField, SelectLabel } from './styled';

const Select = ({ name, value, onChange, options, required, ...props }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (required && !value.trim()) {
      setFocused(false);
    }
  };

  const defaultOption = { value: '', label: '', hidden: true };

  const updatedOptions = [defaultOption, ...options];

  return (
    <SelectContainer focused={focused} isRequiredAndEmpty={required && !value.trim()}>
      <SelectField
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
        required={required}
      >
        {updatedOptions.map((option, index) => (
          <option key={index} value={option.value} hidden={option.hidden}>
            {option.label}
          </option>
        ))}
      </SelectField>
      <SelectLabel focused={focused}>{name || 'Select'}</SelectLabel>
    </SelectContainer>
  );
};





export default Select;
