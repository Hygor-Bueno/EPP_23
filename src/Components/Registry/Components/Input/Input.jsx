import React from 'react';
import { InputContainer, InputField } from './styled';

const Input = ({ name, value, onChange, isDisabled, required, onBlur, ...rest }) => {
  
  return (
    <InputContainer>
      <label>{name}</label>
      <InputField
        {...rest}
        disabled={isDisabled}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        required={required}
        placeholder={name}
      />
    </InputContainer>
  );
};


export default Input;
