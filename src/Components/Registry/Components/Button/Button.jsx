import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled, { StyleSheetManager } from 'styled-components';

const Button = ({ color, bg, onAction, iconImage, children, ...props }) => {
    return (
        <StyleSheetManager shouldForwardProp={(prop) => prop !== 'bg'}>
            <ButtonContainer bg={bg} onClick={onAction} {...props}>
                {iconImage && <FontAwesomeIcon icon={iconImage} />}
                {children}
            </ButtonContainer>
        </StyleSheetManager>
    )
}

const ButtonContainer = styled.button`
    background-color: ${props => props.bg || '#297073'};
    color: #fff;
    padding: var(--spaceDefault) var(--spaceDefaultLL);
    text-align: center;
    border: none;
    border-radius: var(--borderRadius);
    font-size: var(--textSize);
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: #1e5645;
        transform: translateY(-3px);
    }

    &:active {
        background-color: #145238;
        transform: translateY(1px);
    }

    &:focus {
        outline: none;
    }

    svg {
        margin-right: 0px;
        transition: transform 0.2s;
    }
`;

export default Button;
