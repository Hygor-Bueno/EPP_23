import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  max-height: 43vw;
`

export const Flex =  styled.div`
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const ContainerBackground = styled.section`
  width: 50vw;
  height: 100vh;
  background-color: #297073;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  input {
    margin: calc(1.7* var(--spaceDefault)) 0;
  }

  .d-flex {
    margin-top: 1vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1vw;
  }

  .max-box {
    max-width: 600px;
    max-height: 500px;
    background: #cecece13;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  h2 {
    font-size: var(--textSizeL);
  }

  h3 {
    font-size: var(--textSize);
  }

  h5 {
    font-size: var(--textSizeP);
  }
`;

export const ContainerInput = styled.div`
    padding: var(--spaceDefault);
`;