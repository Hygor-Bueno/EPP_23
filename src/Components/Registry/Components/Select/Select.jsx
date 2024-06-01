import React, { useState } from 'react';
import { Req } from '../Input/styled';

import PropTypes from 'prop-types';
import { SelectContainer, SelectField } from './styled';

const Select = (props) => {
  const { name, value, onChange, children, valueKey, labelKey, isReq, required, includeInactive, includeEmb, includeView, ...rest } = props;

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
        {children}
      </SelectField>
    </SelectContainer>
  );
};

Select.defaultProps = {
  name: "Teste",
  isReq: true,
  children: () => (<React.Fragment />),
  onChange: (e) => console.log(e.target.value),
  includeInactive: true,
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  isReq: PropTypes.bool,
  includeInactive: PropTypes.bool,
  includeEmb: PropTypes.bool,
  includeView: PropTypes.bool,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  children: PropTypes.node,
}

export default Select;
