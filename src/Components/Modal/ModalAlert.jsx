import React, { useState } from "react";
import './ModalAlert.css'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ModalAlert({ children, closeModalAlert, title }) {
  return (
    <div id='ModalAlertContainer'>
      <div>
        <span>
          <h3>{title}</h3>
          <button className="btn btn-danger" onClick={() => closeModalAlert()}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </span>
        {children}
      </div>
    </div>
  );
}
