import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaMinus,
    FaPlus,
    FaTrash,
    FaArrowLeft,
    FaShoppingBag,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
    const navigate = useNavigate();
    const {
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

    // Calculate subtotal
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Shipping
    const shipping = subtotal > 0 ? 100 : 0;

    // Free shipping above ₹2000
    const finalShipping = subtotal >= 2000 ? 0 : shipping;

    // Grand total
    const total = subtotal + finalShipping;

    // Empty cart
    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        <FaShoppingBag />
                    </div>

                    <h1>Your Cart is Empty</h1>

                    <p>
                        Looks like you haven't added anything to your cart yet.
                    </p>

                    <Link to="/shop" className="continue-shopping">
                        <FaArrowLeft />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">

            {/* Header */}
            <div className="cart-header">
                <h1>Shopping Cart</h1>

                <p>
                    {cart.reduce(
                        (total, item) => total + item.quantity,
                        0
                    )}{" "}
                    items in your cart
                </p>
            </div>

            <div className="cart-container">

                {/* Cart Items */}
                <div className="cart-items">

                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>

                            {/* Image */}
                            <div className="cart-product-image">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />
                            </div>

                            {/* Product Information */}
                            <div className="cart-product-info">
                                <h3>{item.name}</h3>

                                <p className="cart-category">
                                    {item.category}
                                </p>

                                <p className="cart-price">
                                    ₹{item.price.toLocaleString("en-IN")}
                                </p>
                            </div>

                            {/* Quantity */}
                            <div className="quantity-box">

                                <button
                                    type="button"
                                    onClick={() =>
                                        decreaseQuantity(item.id)
                                    }
                                >
                                    <FaMinus />
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        addToCart(item)
                                    }
                                >
                                    <FaPlus />
                                </button>

                            </div>

                            {/* Item Total */}
                            <div className="cart-item-total">
                                ₹
                                {(
                                    item.price * item.quantity
                                ).toLocaleString("en-IN")}
                            </div>

                            {/* Remove */}
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                <FaTrash />
                            </button>

                        </div>
                    ))}

                    {/* Continue Shopping */}
                    <Link to="/shop" className="back-shop">
                        <FaArrowLeft />
                        Continue Shopping
                    </Link>

                </div>

                {/* Order Summary */}
                <div className="cart-summary">

                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>

                        <strong>
                            ₹{subtotal.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>

                        <strong>
                            {finalShipping === 0
                                ? "FREE"
                                : `₹${finalShipping}`}
                        </strong>
                    </div>

                    {/* Free shipping message */}
                    {subtotal > 0 && subtotal < 2000 && (
                        <p className="shipping-message">
                            Add ₹
                            {(2000 - subtotal).toLocaleString("en-IN")}{" "}
                            more for FREE shipping.
                        </p>
                    )}

                    {subtotal >= 2000 && (
                        <p className="free-shipping-message">
                            🎉 You got FREE shipping!
                        </p>
                    )}

                    <div className="summary-divider"></div>

                    {/* Total */}
                    <div className="summary-total">
                        <span>Total</span>

                        <strong>
                            ₹{total.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    {/* Checkout */}
                    <button
                        type="button"
                        className="checkout-btn"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to Checkout
                    </button>

                    <div className="secure-payment">
                        🔒 Secure & Safe Checkout
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Cart;