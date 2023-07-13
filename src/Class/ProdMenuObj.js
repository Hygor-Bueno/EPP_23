export class ProdMenuObj {
    epp_log_id;
    type_base;
    epp_id_menu;
    epp_id_product;
    plu_menu;

    constructor(epp_id_menu, epp_id_product, plu_menu) {
        this.epp_id_menu = epp_id_menu;
        this.epp_id_product = epp_id_product;
        this.plu_menu = plu_menu;
    }

    exportJson() {
        return {
            epp_log_id: this.epp_log_id,
            type_base: this.type_base,
            epp_id_menu: this.epp_id_menu,
            epp_id_product: this.epp_id_product,
            plu_menu: this.plu_menu
        }
    }

    getEppLogId() {
        return this.epp_log_id;
    }

    getEppIdMenu() {
        return this.epp_id_menu;
    }

    getEppIdProduct() {
        return this.epp_id_product;
    }

    getPluMenu() {
        return this.plu_menu;
    }

    getTypeBase() {
        return this.type_base;
    }

    setEppLogId(epp_log_id) {
        this.epp_log_id = epp_log_id;
    }

    setEppIdMenu(epp_id_menu) {
        this.epp_id_menu = epp_id_menu;
    }

    setEppIdProduct(epp_id_product) {
        this.epp_id_product = epp_id_product;
    }

    setPluMenu(plu_menu) {
        this.plu_menu = plu_menu;
    }

    setTypeBase(type_base) {
        this.type_base = type_base;
    }
}