import styled, {css} from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;

  ${(props) =>
    props.isRequiredAndEmpty &&
    css`
      input {
        border-color: #f00;
      }
    `}
`;

export const InputLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: top 0.3s, font-size 0.3s;
  font-size: 16px;
  z-index: 1;
  color: #999;

  ${(props) =>
    props.focused &&
    css`
      top: -6px;
      font-size: 12px;
    `}
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
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
