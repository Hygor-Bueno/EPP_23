import styled from "styled-components";

export const Container = styled.div`
    width: 40vw;
    height: 100vh;
    background-color: #297073;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;

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
    
`;

export const Card = styled.div`
    width: 35vw;
    height: 30vw;
    background-color: white;
    border-radius: 1vw;
    padding: 1vw;
`;

