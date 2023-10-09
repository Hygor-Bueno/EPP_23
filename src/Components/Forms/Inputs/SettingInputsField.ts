export default class SettingInputsField {
    label:string;
    value:string;
    type: string;
    idInput:string;
    min:number;
    max:number;
    step:number;
    classInput:string;
    classLabel:string;
    classContainer:string;
    name:string;
    checked:boolean;
    constructor(object: { label: string, value: string, type: string }) {
        this.label = object.label;
        this.value = object.value;
        this.type = object.type;
    }
}