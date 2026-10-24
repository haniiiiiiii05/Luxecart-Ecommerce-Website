
import React from "react";
import { Link } from "react-router-dom";
import {
    FaBoxOpen,
    FaShoppingBag,
    FaCheckCircle,
    FaReceipt,
    FaArrowRight,
    FaCreditCard,
    FaCalendarAlt,
} from "react-icons/fa";

import { useOrders } from "../context/OrderContext";
import "./Orders.css";

const Orders = () => {
    const { orders } = useOrders();

    const totalSpent = orders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    return (
        <main className="orders-page">
            <section className="orders-banner">
                <div className="orders-banner-content">
                    <span className="orders-eyebrow">YOUR LUXECART ACCOUNT</span>
                    <h1>My Orders</h1>
                    <p>
                        Every purchase, all in one place.
                        Thank you for shopping with LuxeCart.
                    </p>
                </div>

                <div className="orders-banner-icon">
                    <FaShoppingBag />
                </div>
            </section>

            <section className="orders-content">
                <div className="orders-heading">
                    <div>
                        <h2>Order History</h2>
                        <p>Keep track of your recent purchases.</p>
                    </div>

                    <Link to="/shop" className="orders-browse-link">
                        Continue shopping <FaArrowRight />
                    </Link>
                </div>

                <div className="orders-summary">
                    <div className="summary-card">
                        <span className="summary-icon">
                            <FaReceipt />
                        </span>
                        <div>
                            <p>Total Orders</p>
                            <h3>{orders.length}</h3>
                        </div>
                    </div>

                    <div className="summary-card">
                        <span className="summary-icon">
                            <FaCheckCircle />
                        </span>

                        <div>
                            <p>Orders Placed</p>
                            <h3>{orders.length}</h3>
                        </div>
                    </div>

                    <div className="summary-card">
                        <span className="summary-icon">
                            <FaCreditCard />
                        </span>
                        <div>
                            <p>Total Order Value</p>
                            <h3>₹{totalSpent.toLocaleString("en-IN")}</h3>
                        </div>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="orders-empty">
                        <div className="empty-icon">
                            <FaBoxOpen />
                        </div>

                        <h2>Your story starts here</h2>
                        <p>
                            You haven't placed an order yet. Discover something
                            you love and your purchases will appear here.
                        </p>

                        <Link to="/shop" className="orders-primary-btn">
                            Explore the collection <FaArrowRight />
                        </Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => {
                            const items = Array.isArray(order.items)
                                ? order.items
                                : [];

                            const status = order.status || "Order Placed";
                            const statusClass = status
                                .toLowerCase()
                                .replace(/\s+/g, "-");

                            return (
                                <article className="order-card" key={order.id}>
                                    <div className="order-card-top">
                                        <div className="order-reference">
                                            <span className="order-label">ORDER REFERENCE</span>
                                            <h3>#{order.id}</h3>
                                        </div>

                                        <span className={`order-status status-${statusClass}`}>
                                            <FaCheckCircle />
                                            {status}
                                        </span>
                                    </div>

                                    <div className="order-meta">
                                        <span>
                                            <FaCalendarAlt />
                                            {order.date || "Date unavailable"}
                                        </span>
                                        <span>
                                            <FaShoppingBag />
                                            {items.length} {items.length === 1 ? "item" : "items"}
                                        </span>
                                    </div>

                                    <div className="order-products">
                                        {items.map((item, index) => (
                                            <div
                                                className="order-product"
                                                key={item.id ?? `${order.id}-${index}`}
                                            >
                                                <div className="order-product-image">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name || "Product"} />
                                                    ) : (
                                                        <FaShoppingBag />
                                                    )}
                                                </div>

                                                <div className="order-product-info">
                                                    <h4>{item.name || "Product"}</h4>
                                                    {item.category && <p>{item.category}</p>}
                                                    <span>Qty: {Number(item.quantity) || 1}</span>
                                                </div>

                                                <strong className="order-product-price">
                                                    ₹
                                                    {(
                                                        Number(item.price || 0) *
                                                        (Number(item.quantity) || 1)
                                                    ).toLocaleString("en-IN")}
                                                </strong>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="order-card-bottom">
                                        <div className="order-payment">
                                            <span>PAYMENT METHOD</span>
                                            <strong>{order.payment || "Not specified"}</strong>
                                        </div>

                                        <div className="order-total">
                                            <span>ORDER TOTAL</span>
                                            <strong>
                                                ₹{Number(order.total || 0).toLocaleString("en-IN")}
                                            </strong>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Orders;