import styled from "styled-components";

export const ContainerTableInformation = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  max-height: 90vh;
  margin-bottom: 1vw;
`;

export const Flex =  styled.div`
  width: var(--widthInput);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const NavigationBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--spaceDefault);
`

export const GroupButton = styled(NavigationBox)`
  gap: 4vw;
  justify-content: center;
`;

export const ContainerBackground = styled.section`
  width: 80%;
  height: 100vh;

  background-color: #297073;

   // Color Gradient Modern
  /* background: rgb(0,0,0);
  background: linear-gradient(0deg, #000000 0%, #297073 52%); */

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
