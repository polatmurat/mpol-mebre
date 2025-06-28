const connect = require('../config/db');
const Product = require('../models/Product');


const createProduct = async (req, res) => {
    const { title, price, discount, category, stock, description, image } = req.body;

    if (title.length < 3 || description.length < 3 || category.length < 3) {
        return res.status(400).json({ status: false, message: 'Title or description must have at least 3 characters.' });
    }

    if (!(price > 0)) {
        return res.status(400).json({ status: false, message: 'Price must be above 0' });
    }

    if (discount < 0) {
        return res.status(400).json({ status: false, message: 'Discount cannot be negative' });
    }
    
    if (stock < 0) {
        return res.status(400).json({ status: false, message: 'Stock cannot be negative' });
    }
    

    try {
        
        const client = await connect();

        const productCollection = client.db('mebre').collection('product');
        
        const product = new Product(title, price, discount, category, stock, description, image);

        await productCollection.insertOne(product);

        return res.status(201).json({ status: true, message: 'Product created successfully.' });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal server error');
    }
};

module.exports = { createProduct };