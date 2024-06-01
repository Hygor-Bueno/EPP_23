import { styled, css, keyframes } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import P from 'prop-types';

/**
 * Botão com animações que pode ser reutilizado.
 *
 * @param {*} props
 * @param {string} bg - Background do botão
 * @param {string} borderColor - Cor das bordas do botão
 * @param {string} iconImage - Ícone do botão
 * @param {Function} onAction - Função chamada ao clicar no botão
 * @param {boolean} disabled - disabilita ou ativa o botão
 * @param {boolean} isAnimation - se possui uma animação
 * @param {boolean} animationType - verifica qual tipo da animação
 */
const Button = (props) => {
    const { children, onAction, iconImage, animationType, ...rest } = props;
    const [isClicked, setIsClicked] = useState(false);
    const [_, setShowSuccess] = useState(false);

    const handleClick = (event) => {
        event.stopPropagation();
        setIsClicked(!isClicked);
        if (animationType === "arrow") {
          setShowSuccess(true);
        }

        if (onAction) {
            onAction();
        }

        setTimeout(() => {
          setIsClicked(false);
          if (animationType === "arrow") {
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
            onClick={handleClick}
            disabled={props.disabled}
            $borderColor={props.color}
            $bg={props.bg}
            $isClicked={isClicked}
            $isAnimation={props.isAnimation}
            $animationType={props.animationType}
        >
            {iconImage && (
                <FontAwesomeIcon
                    icon={iconImage}
                    style={{
                        transform: isClicked && props.isAnimation ? (props.isAnimation === 'arrow' ? 'translateY(50px)' : 'rotate(360deg)') : 'rotate(0deg)',
                        transition: isClicked && props.isAnimation ? 'transform 0.5s' : 'transform 0.5s'
                    }}
                />
            )}
            <label>{children}</label>
        </ButtonContainer>
    );
};

Button.defaultProps = {
  bg: '#297073',
  onAction: () => console.log('click'),
  iconImage: faCog,
};

Button.propTypes = {
  bg: P.string.isRequired,
  onAction: P.func.isRequired,
  iconImage: P.any,
  children: P.string,
  borderColor: P.string,
  isAnimation: P.bool,
  animationType: P.node,
};

const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
`;

export const arrowAnimation = keyframes`
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

export const ButtonContainer = styled.button`
    position: relative;
    width: 100%; // 20%
    overflow: hidden;
    background-color: ${({ $bg }) => $bg || 'transparent'};

    color: #fff;
    padding: var(--spaceDefaultP) var(--spaceDefault);
    text-align: center;
    border: var(--borderSize) solid;
    border-color: ${({ $borderColor }) => $borderColor || '#fff'};
    border-radius: var(--borderRadius);
    flex: 1;
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
