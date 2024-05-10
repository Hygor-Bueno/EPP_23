import styled, { keyframes } from "styled-components";

// Definindo a animação antes de usá-la
export const bounceAnimation = keyframes`
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
