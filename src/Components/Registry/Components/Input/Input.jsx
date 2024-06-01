import React from 'react';
import PropTypes from 'prop-types';
import { InputContainer, InputField, Req } from './styled';

/**
 * Input
 *
 * @param {{name:string;value:[string, number, boolean, object, any];isReq:boolean;isDisabled:Boolean;innerRef:any;placeHolder:string}} props
 * @param ref - React component
 * @param name - Título do component
 * @param value - valor do input
 * @param onChange - Função do input
 * @param isDisabled - Disabilita o campo do input
 * @param placeHolder - hablita para voce colocar algum dentro do Input
 *
 * @returns
 */
const Input = (props) => {
  const { name, value, onChange, isDisabled, required, onBlur, isReq, innerRef, placeHolder, ...rest } = props;

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
        placeholder={placeHolder}
      />
    </InputContainer>
  );
};

Input.defaultProps = {
  name: 'Teste',
  isReq: true,
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object, PropTypes.any]),
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  innerRef: PropTypes.any,
  placeHolder: PropTypes.string
}

export default Input;
