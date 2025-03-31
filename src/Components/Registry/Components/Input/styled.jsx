import styled from 'styled-components';

export const InputContainer = styled.div`
  position: relative;

  label {
    font-size: var(--textSize);
    font-weight: var(--fontWeight-bold);
    color: #297073;
  }
`;

export const InputField = styled.input`
  width: var(--widthInput);
  padding: var(--spaceDefault);
  font-size: var(--textSize);

  margin: 0 !important;

  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  position: relative;
  z-index: 2;

  &:focus {
    border-color: #297073;
  }
`;

export const Req = styled.label`
  font-size: var(--textSizeP) !important;
  position: absolute;
  color: #ff0000 !important;
`;
