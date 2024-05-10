import React from "react";
import styled from "styled-components";

export const Title = ({children}) => {
  return (
    <React.Fragment>
      <TitleComponent>{children}</TitleComponent>
    </React.Fragment>
  )
}

export const Subtitle = ({children}) => {
  return (
    <React.Fragment>
      <SubtitileComponent>{children}</SubtitileComponent>
    </React.Fragment>
  )
}

const TitleComponent = styled.h2`
  margin-bottom: var(--spaceDefaultLL);
  font-weight: 600;
  color: #297073;
`;

const SubtitileComponent = styled.h3`
  margin-bottom: var(--spaceDefaultLL);
  font-weight: 600;
  color: #297073;
`;
