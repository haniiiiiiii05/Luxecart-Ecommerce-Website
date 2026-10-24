import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity = 1) => {
        const exists = cart.find(
            (item) => item.id === product.id
        );

        if (exists) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                )
            );

            alert(`${product.name} quantity increased`);
        } else {
            setCart([
                ...cart,
                {
                    ...product,
                    quantity: quantity,
                },
            ]);

            alert(`${product.name} added to cart`);
        }
    };

    const increaseQuantity = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart(
            cart
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {
        const product = cart.find(
            (item) => item.id === id
        );

        setCart(
            cart.filter((item) => item.id !== id)
        );

        if (product) {
            alert(`${product.name} removed from cart`);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>


    );
};

export const useCart = () => {
    return useContext(CartContext);
};