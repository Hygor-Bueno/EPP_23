import styled from "styled-components";

export const BackgroundTable = styled.div`
  width: 50vw;
  height: 15vw;
  overflow: auto;
`;

export const Card = styled.div`
  overflow: auto;
  width: clamp(1px, 40vw, 800px);
  height: clamp(1px, 30vw, 600px);
  margin: 0 var(--spaceDefault);
  background-color: white;
  border-radius: var(--borderRadius);
  padding: var(--spaceDefault);

  @media screen and (max-width: 768px) {
    .col-sm-12 {
      margin-bottom: var(--spacing-sm);
    }
  }
`;

export const LimitationBox = styled.div`
  height: clamp(1vw, 30vh, 200px);
  overflow-y: auto;
`;