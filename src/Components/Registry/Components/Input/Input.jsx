import React from 'react';
import { InputContainer, InputField, Req } from './styled';

const Input = ({ name, value, onChange, isDisabled, required, onBlur, innerRef, isReq, ...rest }) => {

  return (
    <InputContainer>
      <label>{name}</label>{isReq ? <Req>*</Req> : ''}
      <InputField
        {...rest}
        ref={innerRef}
        disabled={isDisabled}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={name}
      />
    </InputContainer>
  );
};

export default Input;
