export class Order {
    id_order = "";
    fone = "";
    email = "";
    signal_value = "";
    id_menu = "";
    plu_menu = "";
    type_rice = "";
    description = "";
    delivered = "";
    dessert = "";
    store = "";
    name_client = "";
    date_order = "";
    delivery_date = "";
    delivery_hour = "";
    delivery_store = "";
    user_id = 0;
    total = 0;
    observation = "";

    constructor(id_order, fone, email, signal_value, plu_menu, id_menu, type_rice, dessert, name_client, logSales, delivered, store, user_id, date_order, delivery_date, delivery_hour, delivery_store, total, observation) {
        this.id_order = id_order;
        this.fone = fone;
        this.email = email;
        this.signal_value = signal_value;
        this.plu_menu = plu_menu;
        this.id_menu = id_menu;
        this.type_rice = type_rice;
        this.dessert = dessert;
        this.name_client = name_client;
        this.description = this.formateAdditional(logSales);
        this.delivered = delivered;
        this.store = store;
        this.user_id = user_id;
        this.date_order = date_order;
        this.delivery_date = delivery_date;
        this.delivery_hour = delivery_hour;
        this.delivery_store = delivery_store;
        this.total = total;
        this.observation = observation;
    }
    formateAdditional(logSales) {
        let result = '';
        console.log(logSales);
        logSales.forEach(item => {
                result += `Cód.: ${item.epp_id_product}.\nDescrição: ${item.getDescription()} - ${item.quantity} ${item.getMeasure()}. (Preço unit / kg R$ ${item.getPrice_base()})\nSubtotal:R$ ${item.price}\n\n`
        });
        return result;
    }
    getObs() {
        return this.observation;
    }
    getIdOrder() {
        return this.id_order;
    }
    getUserId() {
        return this.user_id;
    }
    getStore() {
        return this.store;
    }
    getNameClient() {
        return this.name_client;
    }
    getDateOrder() {
        return this.date_order;
    }
    getDeliveryDate() {
        return this.delivery_date;
    }
    getDeliveryHour() {
        return this.delivery_hour;
    }
    getDeliveryStore() {
        return this.delivery_store;
    }
    getTotal() {
        return this.total;
    }
    getFone() {
        return this.fone;
    }
    getEmail() {
        return this.email;
    }
    getSignalValue() {
        return this.signal_value;
    }
    getMenu() {
        return this.menu;
    }
    getIdMenu() {
        return this.id_menu;
    }
    getPluMenu() {
        return this.plu_menu;
    }
    getTypeRice() {
        return this.type_rice;
    }
    getDescription() {
        return this.description;
    }
    getDelivered() {
        return this.delivered;
    }
    getDessert() {
        return this.dessert;
    }
    getPriceMenu() {
        return this.price_menu;
    }
    getPriceSingle() {
        return this.price_single;
    }
    getPriceAddList() {
        return this.price_add_list;
    }
    getListCodSingle() {
        return this.list_cod_single;
    }

    setObs(observation) {
        this.observation = observation;
    }
    setIdOrder(id_order) {
        this.id_order = id_order;
    }
    setUserId(user_id) {
        this.user_id = user_id;
    }
    setStore(store) {
        this.store = store;
    }
    setNameClient(name_client) {
        this.name_client = name_client;
    }
    setDateOrder(date_order) {
        this.date_order = date_order;
    }
    setDeliveryDate(date_order) {
        this.delivery_date = date_order;
    }
    setDeliveryHour(delivery_hour) {
        this.delivery_hour = delivery_hour;
    }
    setDeliveryStore(delivery_store) {
        this.delivery_store = delivery_store;
    }
    setTotal(total) {
        this.total = total;
    }
    setFone(fone) {
        this.fone = fone;
    }
    setEmail(email) {
        this.email = email;
    }
    setSignalValue(signal_value) {
        this.signal_value = signal_value;
    }
    setMenu(menu) {
        this.menu = menu;
    }
    setIdMenu(id_menu) {
        this.id_menu = id_menu;
    }
    setPluMenu(plu_menu) {
        this.plu_menu = plu_menu;
    }
    setTypeRice(type_rice) {
        this.type_rice = type_rice;
    }
    setDescription(description) {
        this.description = description;
    }
    setDelivered(delivered) {
        this.delivered = delivered;
    }
    setDessert(dessert) {
        this.dessert = dessert;
    }

    formatFone(fone) {
        if (!fone || fone.length >= 16) {
            return fone ? fone.split("/") : ["", ""]
        } else {
            return fone.length === 14 ? ["", fone] : [fone, ""]
        }
    }
}