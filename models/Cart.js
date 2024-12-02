const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
});

const cartSchema = new mongoose.Schema({
    products: [cartProductSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

cartSchema.methods.calculateTotal = async function () {
    const productModel = mongoose.model('Product'); // Dynamic import of the Product model

    this.totalPrice = await this.products.reduce(async (totalPromise, item) => {
        const total = await totalPromise;
        const product = await productModel.findById(item.product); // Fetch product details
        return total + product.price * item.quantity;
    }, Promise.resolve(0));

    return this.totalPrice;
};

module.exports = mongoose.model('Cart', cartSchema);
