import React, { useState } from 'react';
import styled from 'styled-components'; 

const Select = ({ name, value, onChange, options, valueKey, labelKey, required, includeInactive, includeEmb, includeView, ...rest }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (required && !value.trim()) {
      setFocused(false);
    }
  };

  const renderOptions = () => {
    let renderedOptions = options?.map((option, index) => (
      <option key={index} value={option[valueKey]}>
        {option[labelKey]}
      </option>
    ));

    if (includeInactive) {
      renderedOptions.push(
        <option key="ativo" value="1">
          Ativo
        </option>,
        <option key="inativo" value="0">
          Inativo
        </option>
      );
    }

    if (includeEmb) {
      renderedOptions.push(
        <option key="Un" value="Un">
          Un
        </option>,
        <option key="Kg" value="Kg">
          Kg
        </option>
      );
    }

    if (includeView) {
      renderedOptions.push(
        <option key="Table" value="menu">
          Menu
        </option>,
        <option key="Menu" value="table">
          Table
        </option>
      );
    }

    return renderedOptions;
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
        {renderOptions()}
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
