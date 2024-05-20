import React from 'react';
import P from 'prop-types';
import { InputContainer, InputField, Req } from './styled';

const Input = (props) => {
  const { name, value, onChange, isDisabled, onBlur, innerRef, isReq, ...rest } = props;

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

Input.propTypes = {
  name: P.string.isRequired,
  value: P.node,
  onChange: P.func,
  isDisabled: P.bool,
  isReq: P.bool,
  onBlur: P.func,
  innerRef: P.any,
}

export default Input;
