import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaHeart,
    FaShoppingCart,
    FaStar,
    FaMinus,
    FaPlus,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductDetails.css";

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();

    const product = location.state?.product;

    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product Not Found</h2>
                <Link to="/shop">Back to Shop</Link>
            </div>
        );
    }

    const isWishlisted = wishlist.some(
        (item) => item.id === product.id
    );

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate("/checkout");
    };

    return (
        <div className="product-details-page">

            <div className="product-details-container">

                <Link to="/shop" className="product-back">
                    <FaArrowLeft />
                    Back to Shop
                </Link>

                <div className="product-details">

                    {/* IMAGE */}
                    <div className="product-details-image">
                        {product.oldPrice && (
                            <span className="details-sale-badge">
                                SALE
                            </span>
                        )}

                        <img
                            src={product.image}
                            alt={product.name}
                        />
                    </div>

                    {/* INFORMATION */}
                    <div className="product-details-info">

                        <p className="details-category">
                            {product.category}
                        </p>

                        <h1>{product.name}</h1>

                        <div className="details-rating">
                            <span>
                                <FaStar />
                            </span>
                            {product.rating || "4.5"} / 5
                        </div>

                        <div className="details-price">
                            <strong>
                                ₹{product.price.toLocaleString("en-IN")}
                            </strong>

                            {product.oldPrice && (
                                <del>
                                    ₹{product.oldPrice.toLocaleString("en-IN")}
                                </del>
                            )}
                        </div>

                        <p className="details-description">
                            Experience premium quality and stylish design
                            with this product from LuxeCart. Perfect for
                            everyday use and designed to give you comfort
                            and confidence.
                        </p>

                        {/* QUANTITY */}
                        <div className="details-quantity">
                            <span>Quantity</span>

                            <div className="quantity-control">
                                <button onClick={decreaseQuantity}>
                                    <FaMinus />
                                </button>

                                <span>{quantity}</span>

                                <button onClick={increaseQuantity}>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="details-buttons">

                            <button
                                className="details-cart-btn"
                                onClick={handleAddToCart}
                            >
                                <FaShoppingCart />
                                Add to Cart
                            </button>

                            <button
                                className="buy-now-btn"
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </button>

                            <button
                                className={`details-wishlist-btn ${isWishlisted ? "wishlisted" : ""
                                    }`}
                                onClick={() => toggleWishlist(product)}
                            >
                                <FaHeart />
                                {isWishlisted
                                    ? "Remove from Wishlist"
                                    : "Add to Wishlist"}
                            </button>

                        </div>

                        <div className="product-features">

                            <div>
                                <strong>✓</strong>
                                <span>Premium Quality</span>
                            </div>

                            <div>
                                <strong>✓</strong>
                                <span>Secure Payment</span>
                            </div>

                            <div>
                                <strong>✓</strong>
                                <span>Fast Delivery</span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;