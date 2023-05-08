import { Connection } from "../Util/RestApi";

export default class LogSales {
    epp_id_log = "";
    epp_id_product = "";
    epp_id_order = "";
    quantity = "";
    price = "";
    menu = "";
    #price_base="";
    #description = "";
    #measure = "";
    #base_item=false;
    #conn = new Connection();
    constructor(eppIdLog, eppIdProduct, eppIdOrder, quantity, price, menu,description,measure,base_item) {
        this.epp_id_log = eppIdLog;
        this.epp_id_product = eppIdProduct;
        this.epp_id_order = eppIdOrder;
        this.quantity = quantity;
        this.price = price;
        this.menu = menu.toString();
        this.#description = description;
        this.#measure = measure;
        this.#base_item = base_item || false;
    }
    async addItem() {
        try{
            let price = await this.getConsincoPrice(this.epp_id_product);
            if(price <= 0) throw new Error("Dados não Encontrados");
            this.#price_base = price;
            this.price = price * this.quantity;
        }catch(e){
            console.log(e)
        }
    }
    async getConsincoPrice(id_product) {
        let price = 0;
            let itemConsinco = await this.#conn.get(`&id_product='${id_product}'&id_shop=${localStorage.getItem('num_store')}`, "EPP/Product.php")
            if (itemConsinco.length > 0) price = itemConsinco[0].PRECO;
        return price;
    }
    setDescription(description) {
        this.#description = description;
    }
    getDescription() {
        return this.#description;
    }
    getPrice_base() {
        return parseFloat(this.#price_base).toFixed(2);
    }
    getBase_item() {
        return this.#base_item;
    }
    getMeasure(){
        return this.#measure;
    }
}