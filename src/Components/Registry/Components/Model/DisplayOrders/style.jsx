import styled from "styled-components";

export const Request = styled.div`
    width: 100%;
    border: var(--borderSize) solid #000;
    border-radius: var(--borderRadius);
    padding: var(--spaceDefault);

    cursor: pointer;

    background-color: #fff;

    margin-bottom: var(--spaceDefault);

    display: flex;
    justify-content: space-between;

    h6 {
        font-weight: 600;
    }

    h6, label {
        font-size: var(--textSize);
    }

    &:hover {
        background-color: #297073;

        h6, label {
            color: #fff;
            font-size: var(--textSize);
        }
    }
`;

export const Container = styled.div`
    background-color: #0008;
    position: absolute;
    z-index: 9999;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
        font-size: var(--textSizeL);
        font-weight: 600;
    }
`;

export const Modal = styled.div`
    background-color: var(--primaryColor);
    width: clamp(50px, 50vw, 100vmin);
    height: clamp(50px, 80vh, 100vmin);
    border-radius: var(--borderRadius);
    border: var(--borderSize) solid #000;
    padding: var(--spaceDefault);
`;

export const ModalRequest = styled.div`
    padding: var(--spaceDefault);
    border-radius: var(--borderRadius);
    border: var(--borderSize) solid #000;
    height: clamp(50px, 80vh, 68vmin);
    overflow-y: scroll;
    margin: 0 auto;

    background-color: #e4dede8f;
`;

export const Row = styled.div`
  white-space: nowrap;

  label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
