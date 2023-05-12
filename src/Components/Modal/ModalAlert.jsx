import React, { useState } from "react";
import './ModalAlert.css'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ModalAlert(props) {
  return (
    <div id='ModalAlertContainer'>
      <div id={styleModal(props.jAlert.type)}>
        <span>
          <h3>{props.jAlert.title}</h3>
          <button className="btn btn-danger" onClick={() => props.closeModalAlert()}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </span>
        <p>{props.jAlert.message}</p>
      </div>
    </div>
  );

  function styleModal(type){
    let result = '';
    if(type === 0){
      result = 'ModalColor0'
    }else if (type === 1){
      result = 'ModalColor1'
    }else{
      result = 'ModalColor2'
    }
    return result;
  }
}
