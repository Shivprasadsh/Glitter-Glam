// import React, { useState, useEffect } from 'react';

// const Cart = () => {
//     const [products, setProducts] = useState([]);
//     const [selectedItems, setSelectedItems] = useState(0);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [tax, setTax] = useState(0);
//     const taxRate = 0.05; // 5% tax rate
//     const [grandTotal, setGrandTotal] = useState(0);

//     // Utility functions to calculate totals
//     const calculateSelectedItems = (products) =>
//         products.reduce((total, product) => total + product.quantity, 0);

//     const calculateTotalPrice = (products) =>
//         products.reduce((total, product) => total + product.quantity * product.price, 0);

//     const calculateTax = (totalPrice) => totalPrice * taxRate;

//     const calculateGrandTotal = (totalPrice, tax) => totalPrice + tax;

//     // Add product to cart
//     const addToCart = (product) => {
//         const productExists = products.find((item) => item._id === product._id);

//         if (!productExists) {
//             setProducts([...products, { ...product, quantity: 1 }]);
//         } else {
//             console.log("Item already added");
//         }
//     };

//     // Update quantity (increment or decrement)
//     const updateQuantity = (_id, type) => {
//         setProducts((prevProducts) =>
//             prevProducts.map((product) => {
//                 if (product._id === _id) {
//                     if (type === 'increment') {
//                         return { ...product, quantity: product.quantity + 1 };
//                     } else if (type === 'decrement' && product.quantity > 1) {
//                         return { ...product, quantity: product.quantity - 1 };
//                     }
//                 }
//                 return product;
//             })
//         );
//     };

//     // Remove product from cart
//     const removeFromCart = (_id) => {
//         setProducts((prevProducts) => prevProducts.filter((product) => product._id !== _id));
//     };

//     // Recalculate totals whenever products change
//     useEffect(() => {
//         const newTotalPrice = calculateTotalPrice(products);
//         const newTax = calculateTax(newTotalPrice);
//         const newGrandTotal = calculateGrandTotal(newTotalPrice, newTax);

//         setSelectedItems(calculateSelectedItems(products));
//         setTotalPrice(newTotalPrice);
//         setTax(newTax);
//         setGrandTotal(newGrandTotal);
//     }, [products]);

//    