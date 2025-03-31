import styled from "styled-components";

export const SelectContainer = styled.div`
  position: relative;
  label {
    font-size: var(--textSize);
    color: #297073;
    font-weight: var(--fontWeight-bold);
  }
`;

export const SelectField = styled.select`
  width: var(--widthInput);
  padding: var(--spaceDefault);
  font-size: var(--textSize);

  border: var(--borderSizeL) solid #ccc;
  border-radius: var(--borderRadius);
  appearance: none;
  outline: none;
  position: relative;
  z-index: 2;
  background-color: transparent;


  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 20px;

  &:focus {
    border-color: #297073;
  }
`;
