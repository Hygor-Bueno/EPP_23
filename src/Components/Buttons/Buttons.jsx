import React from "react";
import SettingButtons from "./SettingButtons.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Buttons(props = { ...SettingButtons }) {
    return (
        <button
            className={props.buttonClass}
            title={props.buttonTitle}
            onClick={()=>props.buttonClick()}
            type='button'
        >
            <FontAwesomeIcon icon={props.buttonIcon } />
        </button>
    );
}