export class MenuObj {
    id_menu = "";
    description = "";
    status = ""

    constructor (id_menu, description, status){
        this.id_menu = id_menu;
        this.description = description;
        this.status = status;
    }

    setId_Menu(id_menu){
        this.id_menu = id_menu;
    }

    setDescription(description){
        this.description = description;
    }

    setStatus(status){
        this.status = status;
    }

    getId_Menu(){
        return this.id_menu;
    }

    getDescription(){
        return this.description;
    }

    getStatus(){
        return this.status;
    }

}