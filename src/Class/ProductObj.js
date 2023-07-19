export class ProductObj {
    id_product = "";
    description = "";
    id_category = "";
    id_category_fk = "";
    category = "";
    cat_description = "";
    measure = "";
    status_prod = "";
    price = "";

    constructor(id_product, description, category, measure, status_prod, price) {
        this.id_product = id_product;
        this.description = description;
        this.category = category;
        this.id_category = category;
        this.id_category_fk = category;
        this.cat_description = category;
        this.measure = measure;
        this.status_prod = status_prod;
        this.price = price;
    }

    exportJson() {
        return {
            id_product: this.id_product,
            description: this.description,
            category: this.category,
            id_category: this.category,
            id_category_fk: this.category,
            cat_description: this.cat_description,
            measure: this.measure,
            status_prod: this.status_prod,
            price: this.price,
        };
    }
    
    setId_Product(id_product) {
        this.id_product = id_product;
    }

    setDescription(description) {
        this.description = description;
    }
    
    setCategory(category) {
        this.category = category;
        this.id_category = category;
        this.id_category_fk = category;
    }

    setId_Category(id_category) {
        this.id_category = id_category;
        this.id_category_fk = id_category;
    }
    
    setId_Category_Fk(id_category_fk) {
        this.id_category_fk = id_category_fk;
    }
    
    setCat_Description(cat_description) {
        this.cat_description = cat_description;
    }
    
    setMeasure(measure) {
        this.measure = measure;
    }
    
    setStatus_Prod(status_prod) {
        this.status_prod = status_prod;
    }
    
    setPrice(price) {
        this.price = price;
    }

    getId_Product() {
        return this.id_product;
    }
    
    getDescription() {
        return this.description;
    }

    getId_Category() {
        return this.id_category;
    }
    
    getId_Category_Fk() {
        return this.id_category_fk;
    }
    
    getCategory() {
        return this.category;
    }
    
    getCat_Description() {
        return this.cat_description;
    }
    
    getMeasure() {
        return this.measure;
    }
    
    getStatus_Prod() {
        return this.status_prod;
    }
    
    getPrice() {
        return this.price;
    }
}
