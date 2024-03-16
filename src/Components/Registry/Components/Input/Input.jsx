import React, { useState } from 'react';
import { InputContainer, InputField, InputLabel } from './styled';

const Input = ({ name, value, onChange, required, ...props }) => {
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
    <InputContainer focused={focused} isRequiredAndEmpty={required && !value.trim()}>
      <InputField
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
        required={required}
      />
      <InputLabel focused={focused}>{name || 'Cod'}</InputLabel>
    </InputContainer>
  );
};

export default Input;
