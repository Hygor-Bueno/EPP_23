import React, { useState } from "react";
import SettingSelectField from "./SettingSelectField";

interface Props {
    select: SettingSelectField;
}

export default function SelectField(props: Props): JSX.Element {
    const [value,setValue]=useState<string>(props.select.selectValue);

    return (
        <div className={props.select.containerClass}>
            <label className={props.select.labelClass}>{props.select.label}</label>
            <select className={`form-control ${props.select.selectClass}`} onChange={(element) => { props.select.selectValue = element.target.value; props.select.clickAction && props.select.clickAction() }}>
                <option value="" hidden={true}>selecione</option>
                {props.select.options.map(item => (buildOptions(item)))}
            </select>
        </div>
    );

    function buildOptions(object: { code: string, name: string }): JSX.Element {
        return (
            <option key={`${object.code}_${object.name}`} value={object.code}>
                {object.name}
            </option>
        );
    };
}