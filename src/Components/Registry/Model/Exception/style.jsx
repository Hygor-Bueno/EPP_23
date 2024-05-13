import styled from "styled-components";
import { Modal } from "../DisplayOrders/style";

export const Container = styled.div`
  position: absolute;
  z-index: 9999;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #0000086c;
`;

export const ImageExpetion = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  h2 {
    font-size: var(--textSizeXL);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .warning {
    color: #ff9900;
  }

  .success {
    color: #05bd36;
  }

  .error {
    color: #ff0022;
  }

  h3 {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #797979cd;
  }
`;

export const ModalExpetion = styled(Modal)`
  position: absolute;
  top: 23%;
  left: 35%;
  width: clamp(50px, 28vw, 100vmin);
  height: clamp(50px, 50vh, 100vmin);

  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;

  gap: 1.5rem;
`;

export const Button = styled.button`
  position: ${({$isAbsolute}) => $isAbsolute ? 'absolute' : 'initial'};

  top: 2%;
  right: 2%;

  border: 2px solid #ccc;
  color: #8f8e8e;
  border-radius: var(--borderRadius);
  padding: var(--spaceDefault);

  transition: all ease .3s;

  &:hover {
        transition: all ease .3s;
        background-color: #1e5645;
        color: white;
  }

  &:active {
      background-color: #145238;
  }

  &:focus {
      outline: none;
  }

  width: ${({width}) => width};
`;
