import styled, { keyframes } from "styled-components";

// Definindo a animação antes de usá-la
const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;


const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #297073; /* Fundo escuro transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Box = styled.div`
  width: 60px;
  border-radius: var(--borderRadius);
  height: 60px;
  background-color: transparent;
  border: 1px solid transparent;
  animation: ${bounceAnimation} 0.5s ease-in-out infinite;

  svg {
    width: 100%;
    height: 100%;
  }
`;

// Create a styled component for the CircleSpinner
export const CircleSpinner = styled.div`
  position: relative;
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #1f1f1f7b;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .spinner {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid #297073;
    border-radius: 50%;
    border-top-color: rgb(255, 255, 255);
    animation: ${spinnerAnimation} 1s infinite linear;
  }
`;
