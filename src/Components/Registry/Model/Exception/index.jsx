import React from "react";
import P from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faFileCircleCheck, faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, ModalExpetion, ImageExpetion } from "./style";
import PropTypes from 'prop-types';


// Ainda retorno o erro!
/**
 * Modelo de erro por resposta do WebServices.
 *
 * @param {{ [x: string]: any; error: any; translate: any; isConfirm: any; openException: any; closeException: any; }} param
 * @param {*} error
 * @param {*} translate
 * @param {*} isConfirm
 * @param {*} openException
 * @param {*} closeException
 * @param {{ [x: string]: any; }} rest Resgata todas as propriedades do componente para serem utilizado mesmo não sendo especificado. atualização do ES6
 * @returns {*}
 */
const Exception = (props) => {
  const {error, translate, isConfirm, openException, closeException, ...rest} = props;

  return (
    <React.Fragment>
      <Container {...rest}>
        <div className="d-block">
          <ModalExpetion onClick={(e) => e.stopPropagation()}>
                <Button $isAbsolute width="10%" {...rest}>X</Button>
                {isConfirm ? (
                  <ImageExpetion $error={error}>
                    <div>
                      <FontAwesomeIcon icon={!error ? faFileCircleCheck : faFileCircleXmark} fontSize={80} color={!error ? "#05bd36" : "#ec2516"} fontWeight={800}/>
                      <h2 className={!error ?'success' : 'error'}>{!error ? 'Ótimo' : 'Erro'}!</h2>
                      <h3>{!error ? 'Enviado com sucesso!' : translate ? translate : 'Houve um erro ao enviar!'}</h3>
                    </div>
                  </ImageExpetion>
                ) : (
                  <React.Fragment>
                    <ImageExpetion>
                      <div>
                        <FontAwesomeIcon icon={faExclamationTriangle} fontSize={80} color={"#ff9100"} fontWeight={800} />
                        <h2 className="warning">Aviso!</h2>
                        <h3>Voce tem certeza que quer continuar?</h3>
                      </div>
                    </ImageExpetion>
                    <div className="d-flex gap-4">
                      <Button width="50%" onClick={openException}>Continuar</Button>
                      <Button width="50%" onClick={closeException}>Fechar</Button>
                    </div>
                  </React.Fragment>
                )}
          </ModalExpetion>
        </div>
      </Container>
    </React.Fragment>
  );
}

Exception.propTypes = {
  error: PropTypes.any,
  translate: PropTypes.any,
  isConfirm: PropTypes.any,
  openException: PropTypes.any,
  closeException: PropTypes.any,
}

export default Exception;
