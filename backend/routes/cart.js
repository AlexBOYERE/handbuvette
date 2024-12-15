const express = require('express');
const router = express.Router();

// Panier
let cart = [
    { productId: '1', quantity: 2 },
    { productId: '2', quantity: 1 },
    { productId: '3', quantity: 3 },
];

// Route pour obtenir le contenu du panier
router.get('/', (req, res) => {
    res.json({ cart });
});

// Route pour ajouter un produit au panier
router.post('/', (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    // Add or update the product in the cart
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    res.json({ message: 'Product added to cart', cart });
});

// Supprimer un produit du panier
router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    cart = cart.filter(item => item.productId !== productId);
    res.json({ message: 'Product removed from cart', cart });
});

module.exports = router;
