import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (product) => {
        console.log("Wishlist clicked:", product);

        const exists = wishlist.some(
            (item) => item.id === product.id
        );

        if (exists) {
            setWishlist(
                wishlist.filter(
                    (item) => item.id !== product.id
                )
            );

            alert(`${product.name} removed from wishlist`);
        } else {
            setWishlist([
                ...wishlist,
                product
            ]);

            alert(`${product.name} added to wishlist`);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};