import React, { useState } from 'react';
import styled from 'styled-components'; 

const Select = ({ name, value, onChange, options, required, ...rest }) => {
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
    <SelectContainer $focused={focused} $isrequired={required && !value.trim() ? "true" : "false"}>
      <label>{name}</label>
      <SelectField
        {...rest}
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
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  label {
    font-size: var(--textSize);
    font-weight: var(--fontWeight-bold);
  }
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
