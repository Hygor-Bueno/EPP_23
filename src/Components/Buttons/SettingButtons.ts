export default class SettingButtons{
    buttonClass: string;
    buttonClick:()=>void;
    buttonType:string;
    buttonTitle:string;
    buttonIcon:string;

    constructor(button:{buttonType:string, buttonTitle:string,buttonClass:string, buttonClick:()=>void,buttonIcon:string}){
        this.buttonClass = button.buttonClass;
        this.buttonClick = button.buttonClick;
        this.buttonType = button.buttonType;
        this.buttonTitle = button.buttonTitle;
        this.buttonIcon = button.buttonIcon;
    }
}