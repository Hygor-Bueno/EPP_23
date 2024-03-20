import React, { useState } from 'react';
import styled from 'styled-components'; 

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

const SelectContainer = styled.div`
  position: relative;
`;

const SelectLabel = styled.label`
  position: absolute;
  top: ${props => (props.focused || props.isRequiredAndEmpty) ? '-15px' : '50%'};
  left: 10px;
  transform: ${props => (props.focused || props.isRequiredAndEmpty) ? 'translateY(0)' : 'translateY(-50%)'};
  font-size: ${props => (props.focused || props.isRequiredAndEmpty) ? 'var(--textSizeP)' : 'var(--textSize)'};
  color: ${props => (props.focused || props.isRequiredAndEmpty) ? '#007bff' : '#333'};
  transition: all 0.3s ease;
`;

const SelectField = styled.select`
  width: var(--widthInput);
  padding: var(--spaceDefault);
  font-size: var(--textSize);

  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  position: relative;
  z-index: 2;
  background-color: transparent;

  &:focus {
    border-color: #007bff;
  }
`;

export default Select;
