import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const Button = ({ bg, onAction, disabled, iconImage, children, color, isFormRegister, isAnimation, animationType, ...rest }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [_, setShowSuccess] = useState(false);

    const handleClick = (event) => {
        event.stopPropagation();
        setIsClicked(!isClicked);
        if(animationType == "arrow") {
          setShowSuccess(true);
        }

        if (onAction) {
            onAction();
        }

        setTimeout(() => {

          setIsClicked(false);
          if(animationType == "arrow") {
            setShowSuccess(false);
          }

        }, 2000);
    };

    let animation;

    if (animationType === 'rotate') {
        animation = rotateAnimation;
    } else if (animationType === 'arrow') {
        animation = arrowAnimation;
    }

    return (
        <ButtonContainer
            {...rest}
            $borderColor={color}
            $bg={bg}
            onClick={handleClick}
            disabled={disabled}
            $isClicked={isClicked}
            $isAnimation={isAnimation}
            $animationType={animationType}
        >

            {iconImage && (
                <FontAwesomeIcon
                    icon={iconImage}
                    style={{
                        transform: isClicked && isAnimation ? (animationType === 'arrow' ? 'translateY(50px)' : 'rotate(360deg)') : 'rotate(0deg)',
                        transition: isClicked && isAnimation ? 'transform 0.5s' : 'transform 0.5s'
                    }}
                />
            )}
            <label>{children}</label>
        </ButtonContainer>
    );
};

const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
`;

const arrowAnimation = keyframes`
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(50px);
    }
    75% {
        transform: translateY(50px);
    }
    100% {
        transform: translateY(0);
    }
`;

const ButtonContainer = styled.button`
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: ${({ $bg }) => $bg || 'transparent'};

    color: #fff;
    padding: var(--spaceDefaultP) var(--spaceDefault);
    text-align: center;
    border: var(--borderSize) solid;
    border-color: ${({ $borderColor }) => $borderColor || '#fff'};
    border-radius: var(--borderRadius);
    font-size: var(--textSize);
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    label {
      font-size: var(--textSize);
      position: absolute;

      top: 30%;
      right: 20%;
    }

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
        transform: translate(-50%, -50%);
        font-size: var(--textSize) !important;
        ${({ $isClicked, $isAnimation, $animationType }) =>
            $isClicked && $isAnimation &&
            css`
                animation: ${$animationType === 'arrow' ? arrowAnimation : rotateAnimation} 2s ease-in-out;
                animation-fill-mode: forwards;
            `
        }
    }
`;

export default Button;
