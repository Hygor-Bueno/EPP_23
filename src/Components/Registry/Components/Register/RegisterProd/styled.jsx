import styled from "styled-components";

export const Container = styled.section`
    width: 50vw;
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

    h3 {
        font-size: var(--textSize);
    }

    
    h5 {
        font-size: var(--textSizeP);
    }
`;

export const Card = styled.div`
    overflow: auto;
    width: 42vw;
    height: 30vw;
    
    background-color: white;
    border-radius: 1vw;
    padding: 1vw;

    @media screen and (min-width: 413px) and (max-width: 1025px){
        height: 40vw;
    }

    /* display: flex;
    justify-content: space-between;
    gap: 1.6vw;
    align-items: center; */
`;

