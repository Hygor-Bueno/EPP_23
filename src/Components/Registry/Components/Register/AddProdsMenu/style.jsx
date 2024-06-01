import styled from "styled-components";
import Input from "../../Input/Input";
import Select from "../../Select/Select";
import { Card } from "../RegisterProd/styled";

export const CardMenu = styled(Card)`
  padding-left: var(--spaceDefaultLL);
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;
  gap: 1rem;
`;

export const StyledInput = styled(Input)`
  border-radius: var(--borderRadius);
  font-size: 16px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #aaa;
  }
`;

export const StyledSelect = styled(Select)``;
