import styled from "styled-components";

export const SelectContainer = styled.div`
  position: relative;
  label {
    font-size: var(--textSize);
    font-weight: var(--fontWeight-bold);
  }
`;

export const SelectField = styled.select`
  width: var(--widthInput);
  padding: var(--spaceDefault);
  font-size: var(--textSize);

  border: var(--spaceDefault) solid #ccc;
  border-radius: var(--borderRadius);
  outline: none;
  position: relative;
  z-index: 2;
  background-color: transparent;

  &:focus {
    border-color: #297073;
  }
`;
