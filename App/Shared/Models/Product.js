
class Product {
    constructor(data) {
        if (data.name === undefined) {
            this.initPLPProduct(data);
        } else {
            this.initPDPProduct(data);
        }
    }

    initPLPProduct(data) {
        this.brand = data.c_brand
        this.image = data.c_image
        this.c_price = data.c_price
        this.name = data.product_name
        this.id = data.product_id
    }

    initPDPProduct(data) {
        this.brand = data.brand
        this.image = data.c_image
        this.c_price = data.c_price
        this.name = data.name
        this.id = data.id
    }

    salePrice() {
        return this.c_price.sales?.value ?? 0;
    }

    listPrice() {
        return this.c_price.list?.value ?? 0;
    }

    isPriceRange() {
        return (this.c_price.type === 'range');
    }

    minPrice() {
        return this.c_price.min?.sales?.value ?? 0;
    }

    maxPrice() {
        return this.c_price.max?.sales?.value ?? 0;
    }
}

export default Product;