import React, { useState } from 'react';
import { InputContainer, InputField } from './styled';

const Input = ({ name, value, onChange, required }) => {
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
    <InputContainer focused={+focused} $isrequired={required && !value.trim()}>
      <label>{name}</label>
      <InputField
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
        required={required}
        placeholder={name}
      />
    </InputContainer>
  );
};


export default Input;
