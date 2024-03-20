import React, { useState } from 'react';
import styled from 'styled-components';

const Input = ({ name, value, onChange, required, width, widthBox, ...props }) => {
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
    <InputContainer widthBox={widthBox} focused={focused} isRequiredAndEmpty={required && !value.trim()}>
      <InputField
        {...props}
        width={width}
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

const InputContainer = styled.div`
  /* width: ${props => props.widthBox || 'auto'}; */
  position: relative;
`;

const InputLabel = styled.label`
  position: absolute;
  top: ${props => (props.focused || props.isRequiredAndEmpty) ? '-0px' : '50%'};
  left: var(--spaceDefault);
  transform: ${props => (props.focused || props.isRequiredAndEmpty) ? 'translateY(0)' : 'translateY(-50%)'};
  font-size: ${props => (props.focused || props.isRequiredAndEmpty) ? 'var(--textSizeP)' : 'var(--textSize)'};
  color: ${props => (props.focused || props.isRequiredAndEmpty) ? '#007bff' : '#333'};
  transition: all 0.3s ease;
`;

const InputField = styled.input`
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

export default Input;
