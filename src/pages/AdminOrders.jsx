
import React, { useMemo, useState } from "react";
import { useOrders } from "../context/OrderContext";
import "./AdminOrders.css";

const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
];

function AdminOrders() {
    const { adminOrders, updateOrderStatus } = useOrders();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [message, setMessage] = useState("");

    const filteredOrders = useMemo(() => {
        const query = search.trim().toLowerCase();

        return adminOrders.filter((order) => {
            const matchesSearch = [
                order.id,
                order.customerEmail,
                order.customer?.name,
                order.customer?.email,
            ]
                .filter(Boolean)
                .some((value) =>
                    String(value).toLowerCase().includes(query)
                );

            const matchesStatus =
                statusFilter === "All" ||
                (order.status || "Pending") === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [adminOrders, search, statusFilter]);

    const handleStatusChange = (orderId, newStatus) => {
        try {
            updateOrderStatus(orderId, newStatus);
            setMessage(`Order ${orderId} updated to ${newStatus}.`);
        } catch (error) {
            setMessage(error.message || "Could not update order status.");
        }
    };

    const getTotal = (order) =>
        Number(order.total ?? order.grandTotal ?? 0);

    const getCustomerName = (order) => {
        if (typeof order.customer === "string") {
            return order.customer;
        }

        return (
            order.customer?.name ||
            order.customerName ||
            "Customer"
        );
    };

    const getItems = (order) =>
        Array.isArray(order.items) ? order.items : [];

    return (
        <main className="admin-orders">
            <header className="admin-orders-header">
                <div>
                    <span className="admin-orders-eyebrow">
                        LUXECART / MANAGEMENT
                    </span>
                    <h1>Order Management</h1>
                    <p>Review customer orders and manage their status.</p>
                </div>

                <div className="admin-orders-count">
                    <span>Total Orders</span>
                    <strong>{adminOrders.length}</strong>
                </div>
            </header>

            <section className="admin-orders-stats">
                <article>
                    <span>Pending</span>
                    <strong>
                        {adminOrders.filter(
                            (order) => (order.status || "Pending") === "Pending"
                        ).length}
                    </strong>
                </article>

                <article>
                    <span>Processing</span>
                    <strong>
                        {adminOrders.filter(
                            (order) => order.status === "Processing"
                        ).length}
                    </strong>
                </article>

                <article>
                    <span>Shipped</span>
                    <strong>
                        {adminOrders.filter(
                            (order) => order.status === "Shipped"
                        ).length}
                    </strong>
                </article>

                <article>
                    <span>Delivered</span>
                    <strong>
                        {adminOrders.filter(
                            (order) => order.status === "Delivered"
                        ).length}
                    </strong>
                </article>
            </section>

            {message && (
                <p className="admin-orders-message" role="status">
                    {message}
                </p>
            )}

            <section className="admin-orders-panel">
                <div className="admin-orders-toolbar">
                    <div>
                        <h2>Customer Orders</h2>
                        <p>Search orders or filter by their current status.</p>
                    </div>

                    <div className="admin-orders-filters">
                        <input
                            type="search"
                            placeholder="Search order or customer..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(event.target.value)
                            }
                            aria-label="Filter orders by status"
                        >
                            <option value="All">All Statuses</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="admin-orders-empty">
                        <h3>No orders found</h3>
                        <p>
                            Orders will appear here when customers place purchases.
                        </p>
                    </div>
                ) : (
                    <div className="admin-orders-table-wrapper">
                        <table className="admin-orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Update Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <strong>{order.id}</strong>
                                            <small>
                                                {order.date
                                                    ? String(order.date)
                                                    : "Date unavailable"}
                                            </small>
                                        </td>

                                        <td>
                                            <strong>{getCustomerName(order)}</strong>
                                            <small>
                                                {order.customerEmail || "Email unavailable"}
                                            </small>
                                        </td>

                                        <td>
                                            {getItems(order).length} item(s)
                                            <small>
                                                {getItems(order)
                                                    .map((item) =>
                                                        `${item.name || item.title || "Product"} × ${item.quantity || 1
                                                        }`
                                                    )
                                                    .join(", ")}
                                            </small>
                                        </td>

                                        <td className="admin-orders-total">
                                            ₹{getTotal(order).toLocaleString("en-IN")}
                                        </td>

                                        <td>
                                            <span
                                                className={`admin-order-status status-${(
                                                    order.status || "Pending"
                                                )
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")}`}
                                            >
                                                {order.status || "Pending"}
                                            </span>
                                        </td>

                                        <td>
                                            <select
                                                className="admin-order-status-select"
                                                value={order.status || "Pending"}
                                                onChange={(event) =>
                                                    handleStatusChange(
                                                        order.id,
                                                        event.target.value
                                                    )
                                                }
                                                aria-label={`Update status for order ${order.id}`}
                                            >
                                                {statuses.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default AdminOrders;
