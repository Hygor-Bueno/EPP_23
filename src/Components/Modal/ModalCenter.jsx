import React, { useState } from "react";
import './ModalCenter.css'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ModalCenter({ children, closeModal, title }) {
  return (
    <div id='ModalContainer'>
      <div>
        <span>
          <h3>{title}</h3>
          <button className="btn btn-danger" onClick={() => closeModal()}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </span>
        {children}
      </div>
    </div>
  );
}
