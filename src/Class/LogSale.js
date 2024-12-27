import { Connection } from "../Util/RestApi";
import Util from "../Util/Util";

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
        this.price = parseFloat(price);
        this.menu = menu.toString();
        this.#description = description;
        this.#measure = measure;
        this.#base_item = base_item || false;
    }
    async addItem() {
        let result = {error: false,message:''}
        let util = new Util();
        let item = await util.getConsincoProduct(this.epp_id_product);
        let price= item ? item.PRECO : 0;
        // let price = await this.getConsincoPrice(this.epp_id_product)
        if(price > 0){
            this.#price_base = price;
            this.price = price * this.quantity;
        }else{
            this.#price_base = 0;
            this.price = 0;
            result.error=true;
            result.message = 'Falha ao buscar item...'
        }
        return result;
    }
    async getProductEPP(){
        let result;
        try {
            let req = await this.#conn.get(`&id_product=${this.epp_id_product}&eppProduct=1`,'EPP/Product.php');
            if(req.error) throw new Error(req.message);
            result = req;
        } catch (error) {
            result = {error: true,message:error}
        }
        return result;
    }
    async requestItem() {
        let result = {error: false,message:''}
        try {
            let req = await this.#conn.get(`&id_product=${this.epp_id_product}&id_shop=${localStorage.getItem('num_store')}`,'EPP/Product.php');
            if(req.length<1) throw new Error('Dados não encontrados');
            this.#price_base = req[0].PRECO;
            this.#description = req[0].DESCCOMPLETA;
        } catch (error) {
            result = {error: true,message:error}
        }
        return result;
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
    setMeasure(measure){
        this.#measure = measure;
    }
}