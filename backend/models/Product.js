class Product {
    constructor(title, price, discount = 0, category = 'other', stock = 0, description = '', image = 'https://c8.alamy.com/comp/2DAD7JR/unavailable-stamp-unavailable-sign-round-grunge-label-2DAD7JR.jpg') {
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.category = category;
        this.stock = stock;
        this.description = description;
        this.image = image;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = Product;