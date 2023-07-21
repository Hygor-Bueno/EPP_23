import React, { useEffect, useState } from "react";
import './ModalAlert.css'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Translator from "../../Class/Translator";

export default function ModalAlert(props) {
  const [translator] = useState(new Translator(props.jAlert.message))
  console.log(translator.getMessagePT())
  return (
    <div id='ModalAlertContainer'>
      <div className='d-flex flex-column' id={styleModal(props.jAlert.type)}>
        <span>
          <h3>{props.jAlert.title}</h3>
          <button className="btn btn-danger" onClick={() => props.closeModalAlert()}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </span>
        <div>
          <textarea>{translator.getMessagePT()}</textarea>
        </div>
        {props.existHr && <hr className='time-out' id={styleModal(props.jAlert.type)} />}
        {props.existButton && <button id='ButtonColor1' className="continue-button" onClick={() => props.assistentFunc()}>Continue</button>}
        {props.confirm &&
          <div id="divButtonsDetails">
            <div id="buttonsDetails">
              <button title="Salvar" class="btn btn-outline-success" onClick={() => props.confirmFunc()}>Salvar</button>
              <button title="Cancelar" class="btn btn-outline-danger" onClick={() => props.closeModalAlert()}>Cancelar</button>
            </div>
          </div>
        }
      </div>
    </div>
  );

  function styleModal(type) {
    let result = '';
    if (type === 0) {
      result = 'ModalColor0'
    } else if (type === 1) {
      result = 'ModalColor1'
    } else {
      result = 'ModalColor2'
    }
    return result;
  }
}
