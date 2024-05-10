export default class ParamsModal {
    constructor(type,message,title,isConfirmation,onConfirm) {
        this.type = type;
        this.message = message;
        this.title = title;
        this.isConfirmation = isConfirmation;
        this.onConfirm = onConfirm;
    }

    getType() {
        return this.type;
    }

    setType(value) {
        this.type = value;
    }

    getMessage() {
        return this.message;
    }

    setMessage(value) {
        this.message = value;
    }

    getTitle() {
        return this.title;
    }

    setTitle(value) {
        this.title = value;
    }

    getIsConfirmation() {
        return this.isConfirmation;
    }

    setIsConfirmation(value) {
        this.isConfirmation = value;
    }

    getOnConfirm() {
        return this.onConfirm;
    }

    setOnConfirm(value) {
        this.onConfirm = value;
    }
}
