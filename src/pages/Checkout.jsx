import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaCheckCircle } from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

import "./Checkout.css";

const Checkout = () => {
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
    const { addOrder } = useOrders();
    const navigate = useNavigate();

    const [orderPlaced, setOrderPlaced] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        pincode: "",
        payment: "Cash on Delivery",
        upiId: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const shipping = subtotal >= 2000 ? 0 : 100;
    const total = subtotal + shipping;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handlePaymentChange = (e) => {
        setFormData((previous) => ({
            ...previous,
            payment: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check login before allowing order placement.
        if (!user) {
            alert("Please log in to place your order.");

            navigate("/login", {
                state: {
                    from: { pathname: "/checkout" },
                },
                replace: true,
            });

            return;
        }

        // Prevent placing an empty order.
        if (cart.length === 0) {
            alert("Your cart is empty.");
            navigate("/shop");
            return;
        }

        // Validate UPI.
        if (formData.payment === "UPI") {
            const upiPattern = /^[\w.-]+@[\w.-]+$/;

            if (!upiPattern.test(formData.upiId.trim())) {
                alert("Please enter a valid UPI ID.");
                return;
            }
        }

        // Validate card details.
        if (formData.payment === "Card") {
            const cardNumber = formData.cardNumber.replace(/\s/g, "");

            if (!/^\d{16}$/.test(cardNumber)) {
                alert("Please enter a valid 16-digit card number.");
                return;
            }

            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
                alert("Please enter a valid expiry date in MM/YY format.");
                return;
            }

            const [month, year] = formData.expiry.split("/").map(Number);
            const expiryDate = new Date(2000 + year, month);
            const currentMonth = new Date();
            currentMonth.setDate(1);
            currentMonth.setHours(0, 0, 0, 0);

            if (expiryDate <= currentMonth) {
                alert("Your card has expired. Please use a valid card.");
                return;
            }

            if (!/^\d{3}$/.test(formData.cvv)) {
                alert("Please enter a valid 3-digit CVV.");
                return;
            }
        }

        // Create the order only after authentication and validation.
        const newOrder = {
            id: Date.now(),
            date: new Date().toLocaleDateString("en-IN"),
            customer: {
                name: formData.name.trim(),
                email: formData.email.trim(),
                mobile: formData.mobile.trim(),
                address: formData.address.trim(),
                city: formData.city.trim(),
                pincode: formData.pincode.trim(),
            },
            items: cart.map((item) => ({ ...item })),
            payment: formData.payment,
            subtotal,
            shipping,
            total,
            status: "Order Placed",
        };

        addOrder(newOrder);
        clearCart();
        setOrderPlaced(true);
    };

    // Order success screen.
    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <div className="order-success">
                    <div className="success-icon">
                        <FaCheckCircle />
                    </div>

                    <h1>Order Successful!</h1>

                    <p>
                        Thank you for shopping with LuxeCart.
                    </p>

                    <p className="success-subtext">
                        Your order has been placed successfully.
                    </p>

                    <button
                        className="continue-btn"
                        onClick={() => navigate("/shop")}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    // Empty cart screen.
    if (cart.length === 0) {
        return (
            <div className="checkout-page">
                <div className="empty-checkout">
                    <h1>Your Cart is Empty</h1>

                    <p>
                        Add some products before going to checkout.
                    </p>

                    <button
                        className="continue-btn"
                        onClick={() => navigate("/shop")}
                    >
                        Go to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <h1>Checkout</h1>
                <p>Complete your order securely</p>
            </div>

            <div className="checkout-container">
                {/* Customer Information */}
                <div className="checkout-form-box">
                    <h2>Customer Information</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter mobile number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                name="address"
                                placeholder="Enter your complete address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Enter city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Enter pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    pattern="[0-9]{6}"
                                    title="Enter a valid 6-digit pincode"
                                    maxLength="6"
                                    required
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <h2 className="payment-title">
                            Payment Method
                        </h2>

                        <div className="payment-options">
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Cash on Delivery"
                                    checked={
                                        formData.payment === "Cash on Delivery"
                                    }
                                    onChange={handlePaymentChange}
                                />
                                <span>Cash on Delivery</span>
                            </label>

                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="UPI"
                                    checked={formData.payment === "UPI"}
                                    onChange={handlePaymentChange}
                                />
                                <span>UPI</span>
                            </label>

                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Card"
                                    checked={formData.payment === "Card"}
                                    onChange={handlePaymentChange}
                                />
                                <span>Credit / Debit Card</span>
                            </label>
                        </div>

                        {/* UPI Details */}
                        {formData.payment === "UPI" && (
                            <div className="payment-details">
                                <h3>UPI Payment</h3>

                                <div className="form-group">
                                    <label>UPI ID</label>
                                    <input
                                        type="text"
                                        name="upiId"
                                        placeholder="example@upi"
                                        value={formData.upiId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <p className="payment-note">
                                    Example: yourname@oksbi
                                </p>
                            </div>
                        )}

                        {/* Card Details */}
                        {formData.payment === "Card" && (
                            <div className="payment-details">
                                <h3>Card Details</h3>

                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        inputMode="numeric"
                                        autoComplete="cc-number"
                                        onChange={(e) => {
                                            let value = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 16);

                                            value = value
                                                .replace(/(.{4})/g, "$1 ")
                                                .trim();

                                            setFormData((previous) => ({
                                                ...previous,
                                                cardNumber: value,
                                            }));
                                        }}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            value={formData.expiry}
                                            onChange={(e) => {
                                                let value = e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 4);

                                                if (value.length > 2) {
                                                    value =
                                                        value.substring(0, 2) +
                                                        "/" +
                                                        value.substring(2, 4);
                                                }

                                                setFormData((previous) => ({
                                                    ...previous,
                                                    expiry: value,
                                                }));
                                            }}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="password"
                                            name="cvv"
                                            placeholder="123"
                                            maxLength="3"
                                            inputMode="numeric"
                                            autoComplete="cc-csc"
                                            value={formData.cvv}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 3);

                                                setFormData((previous) => ({
                                                    ...previous,
                                                    cvv: value,
                                                }));
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                <p className="payment-note">
                                    🔒 This demo does not process real card
                                    payments.
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="place-order-btn"
                        >
                            <FaLock />
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="checkout-summary">
                    <h2>Order Summary</h2>

                    <div className="checkout-products">
                        {cart.map((item) => (
                            <div
                                className="checkout-product"
                                key={item.id}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div className="checkout-product-info">
                                    <h3>{item.name}</h3>
                                    <p>Qty: {item.quantity}</p>
                                </div>

                                <strong>
                                    ₹
                                    {(
                                        item.price * item.quantity
                                    ).toLocaleString("en-IN")}
                                </strong>
                            </div>
                        ))}
                    </div>

                    <div className="checkout-line" />

                    <div className="checkout-row">
                        <span>Subtotal</span>
                        <strong>
                            ₹{subtotal.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div className="checkout-row">
                        <span>Shipping</span>
                        <strong>
                            {shipping === 0
                                ? "FREE"
                                : `₹${shipping} `}
                        </strong>
                    </div>

                    <div className="checkout-line" />

                    <div className="checkout-total">
                        <span>Total</span>
                        <strong>
                            ₹{total.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div className="secure-checkout">
                        <FaLock />
                        Secure & Safe Checkout
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
