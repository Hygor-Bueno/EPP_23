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
  
  background-color: white;
  margin: 0 calc(2.6*var(--spaceDefaultL));
  border-radius: var(--borderRadius);
  padding: var(--spaceDefault);

  @media screen and (max-width: 768px) {
    .col-sm-12 {
      margin-bottom: var(--spacing-sm);
    }
  }
`;