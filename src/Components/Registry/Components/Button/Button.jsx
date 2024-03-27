import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Button = ({bg, onAction, iconImage, children, color, isFormRegister, ...rest}) => {
    return (
        <ButtonContainer {...rest} $borderColor={color} $bg={bg} onClick={onAction} >
            {iconImage && <FontAwesomeIcon icon={iconImage} />}
            {children}
        </ButtonContainer>
    )
}

const ButtonContainer = styled.button`
    width: 100%;
    background-color: ${({$bg}) => $bg || '#297073'};
    color: #fff;
    padding: var(--spaceDefaultP) var(--spaceDefault);
    text-align: center;
    border: var(--borderSize) solid;
    border-color: ${({$borderColor}) => $borderColor || '#fff'};
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
