import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ButtonContainer } from './styled';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

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
        if (animationType === "arrow") { // Correção aqui
          setShowSuccess(true);
        }

        if (onAction) {
            onAction();
        }

        setTimeout(() => {
          setIsClicked(false);
          if (animationType === "arrow") { // Correção aqui
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
            $borderColor={props.borderColor}
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
  animationType: true,
  borderColor: '#000',
  isAnimation: true,
  iconImage: faCog,
};

Button.propTypes = {
  bg: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  iconImage: PropTypes.element,
  children: PropTypes.string,
  borderColor: PropTypes.string,
  isFormRegister: PropTypes.bool,
  isAnimation: PropTypes.bool,
  animationType: PropTypes.oneOf(['arrow', 'rotate'])
};

export default Button;
