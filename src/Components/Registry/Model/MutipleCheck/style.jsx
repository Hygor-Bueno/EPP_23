import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.5);

    position: absolute;
    z-index: 99999;

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Modal = styled.div`
    background-color: #ffffff;
    width: clamp(50px, 50vw, 100vmin);
    height: clamp(50px, 80vh, 100vmin);

    border-radius: 8px;
    border: 1px solid #000;

    padding: 16px;
`;

export const Footer = styled.div`
    padding: var(--spaceDefault);
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: var(--spaceDefault);

    button {
        width: 50px;
    }

    h2 {
        font-size: 20px;
        font-weight: 600;
    }
`;

export const TableContainer = styled.div`
    height: 85%;
    width: 100%;
    overflow: auto;
    margin: 0 auto;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #dddddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
`;
