import styled, {css} from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;

  ${(props) =>
    props.isrequired &&
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

