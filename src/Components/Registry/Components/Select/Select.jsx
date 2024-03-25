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

  return (
    <SelectContainer focused={focused} isrequired={required && !value.trim() ? "true" : "false"}>
      <SelectField
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
        required={required}
      >
        <option default hidden value=""></option>
        {options?.map((option, index) => (
          <option key={index} value={option.id_category} hidden={option.hidden}>
            {option.cat_description}
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
  top: ${props => (props.focused || props.isrequired === "true") ? '-16px' : '50%'};
  left: 10px;
  transform: ${props => (props.focused || props.isrequired === "true") ? 'translateY(0)' : 'translateY(-50%)'};
  font-size: ${props => (props.focused || props.isrequired === "true") ? 'var(--textSizeP)' : 'var(--textSize)'};
  color: ${props => (props.focused || props.isrequired === "true") ? '#007bff' : '#333'};
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
