export default class SettingSelectField{
    options: [{code: string, name: string}];
    selectValue: string;
    label: string;
    selectClass: string;
    containerClass: string;
    labelClass: string;
    clickAction:()=>void;
    constructor(select:{selectValue: string, label: string, options: [{code: string, name: string}]}){
        this.selectValue = select.selectValue;
        this.label = select.label;
        this.options = select.options;
    }
}