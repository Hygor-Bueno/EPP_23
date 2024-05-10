import React, { useState } from 'react';
import styled from 'styled-components';
import { Req } from '../Input/styled';

const Select = ({ name, value, onChange, options, valueKey, labelKey, isReq, required, includeInactive, includeEmb, includeView, ...rest }) => {
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
    let renderedOptions = options?.map((option, index) => {
      return (
        <option key={`category_${index}`} value={option[valueKey]}>
          {option[labelKey]}
        </option>
      )
    }

  );

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
        <option key="Menu" value="menu">
          Menu
        </option>,
        <option key="Produto" value="produto">
          Produto
        </option>
      );
    }

    return renderedOptions;
  };

  return (
    <SelectContainer $focused={focused} $isrequired={required && !value.trim() ? "true" : "false"}>
      <label>{name}</label>{isReq ? <Req>*</Req> : ''}
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

  border: var(--borderSizeL) solid #ccc;
  border-radius: var(--borderRadius);
  appearance: none;
  outline: none;
  position: relative;
  z-index: 2;
  background-color: transparent;


  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 20px;

  &:focus {
    border-color: #297073;
  }
`;

export default Select;
