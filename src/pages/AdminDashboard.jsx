
import React, { useMemo, useState } from "react";
import { useProducts } from "../context/ProductContext";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

const emptyProduct = {
    name: "",
    category: "Men",
    price: "",
    oldPrice: "",
    image: "",
    badge: "",
    description: "",
    stock: "20",
};

const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    })}`;

const parseOrderDate = (value) => {
    if (!value) return null;

    // Supports DD/MM/YYYY dates from toLocaleDateString("en-IN")
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        const [day, month, year] = value.split("/").map(Number);
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        ) {
            return date;
        }

        return null;
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

function AdminDashboard() {
    const { adminOrders = [] } = useOrders();

    const { products, addProduct, updateProduct, deleteProduct } =
        useProducts();

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyProduct);
    const [message, setMessage] = useState("");

    // Only delivered orders count toward sales revenue.
    const salesOrders = useMemo(
        () => adminOrders.filter(
            (order) => order.status === "Delivered"
        ),
        [adminOrders]
    );

    const totalRevenue = salesOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const totalOrders = adminOrders.length;

    const averageOrderValue =
        salesOrders.length > 0
            ? totalRevenue / salesOrders.length
            : 0;

    // Build the last six calendar months.
    const monthlySales = useMemo(() => {
        const months = Array.from({ length: 6 }, (_, index) => {
            const date = new Date();
            date.setDate(1);
            date.setMonth(date.getMonth() - (5 - index));

            return {
                key: `${date.getFullYear()}-${date.getMonth()}`,
                label: date.toLocaleDateString("en-IN", {
                    month: "short",
                    year: "2-digit",
                }),
                revenue: 0,
            };
        });

        salesOrders.forEach((order) => {
            const date = parseOrderDate(order.date);
            if (!date) return;

            const key = `${date.getFullYear()}-${date.getMonth()}`;
            const month = months.find((item) => item.key === key);

            if (month) {
                month.revenue += Number(order.total || 0);
            }
        });

        return months;
    }, [salesOrders]);

    const maxMonthlyRevenue = Math.max(
        ...monthlySales.map((month) => month.revenue),
        1
    );

    // Rank products by units sold in delivered orders.
    const bestSellingProducts = useMemo(() => {
        const productSales = {};

        salesOrders.forEach((order) => {
            (order.items || []).forEach((item) => {
                const name = item.name || "Unnamed Product";
                const quantity = Number(item.quantity || 1);

                if (!productSales[name]) {
                    productSales[name] = {
                        name,
                        quantity: 0,
                        revenue: 0,
                    };
                }

                productSales[name].quantity += quantity;
                productSales[name].revenue +=
                    Number(item.price || 0) * quantity;
            });
        });

        return Object.values(productSales)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);
    }, [salesOrders]);

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return products.filter((product) =>
            `${product.name} ${product.category}`
                .toLowerCase()
                .includes(query)
        );
    }, [products, search]);

    const totalStock = products.reduce(
        (total, product) =>
            total + (Number(product.stock) || 0),
        0
    );

    const inventoryValue = products.reduce(
        (total, product) =>
            total +
            Number(product.price || 0) *
            Number(product.stock || 0),
        0
    );

    const openAddForm = () => {
        setEditingId(null);
        setForm({ ...emptyProduct });
        setMessage("");
        setShowForm(true);
    };

    const openEditForm = (product) => {
        setEditingId(product.id);
        setForm({
            name: product.name || "",
            category: product.category || "Men",
            price: String(product.price ?? ""),
            oldPrice: String(product.oldPrice ?? ""),
            image: product.image || "",
            badge: product.badge || "",
            description: product.description || "",
            stock: String(product.stock ?? 0),
        });
        setMessage("");
        setShowForm(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.name.trim()) {
            setMessage("Please enter the product name.");
            return;
        }

        if (
            form.price === "" ||
            !Number.isFinite(Number(form.price)) ||
            Number(form.price) < 0
        ) {
            setMessage("Please enter a valid product price.");
            return;
        }

        if (
            form.stock === "" ||
            !Number.isFinite(Number(form.stock)) ||
            Number(form.stock) < 0
        ) {
            setMessage("Please enter valid stock.");
            return;
        }

        if (
            form.oldPrice !== "" &&
            (!Number.isFinite(Number(form.oldPrice)) ||
                Number(form.oldPrice) < 0)
        ) {
            setMessage("Please enter a valid old price.");
            return;
        }

        const productData = {
            name: form.name.trim(),
            category: form.category,
            price: Number(form.price),
            oldPrice:
                form.oldPrice === "" ? null : Number(form.oldPrice),
            image: form.image.trim(),
            badge: form.badge.trim(),
            description: form.description.trim(),
            stock: Number(form.stock),
        };

        if (editingId !== null) {
            updateProduct(editingId, productData);
            setMessage("Product updated successfully.");
        } else {
            addProduct(productData);
            setMessage("Product added successfully.");
        }

        setShowForm(false);
        setForm({ ...emptyProduct });
        setEditingId(null);
    };

    const handleDelete = (product) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${product.name}"?`
        );

        if (!confirmed) return;

        deleteProduct(product.id);
        setMessage(`${product.name} deleted successfully.`);
    };

    return (
        <main className="admin-dashboard">
            <nav className="admin-navigation">
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/orders">Orders</Link>
            </nav>

            <header className="admin-header">
                <div>
                    <span className="admin-eyebrow">
                        LUXECART / MANAGEMENT
                    </span>
                    <h1>Admin Dashboard</h1>
                    <p>
                        Manage your products, inventory, and sales
                        in one place.
                    </p>
                </div>

                <button
                    className="admin-primary-btn"
                    onClick={openAddForm}
                    type="button"
                >
                    + Add Product
                </button>
            </header>

            <section className="admin-stats">
                <article className="admin-stat-card">
                    <span>Total Products</span>
                    <strong>{products.length}</strong>
                    <small>Products in your catalog</small>
                </article>

                <article className="admin-stat-card">
                    <span>Total Stock</span>
                    <strong>{totalStock}</strong>
                    <small>Units currently listed</small>
                </article>

                <article className="admin-stat-card">
                    <span>Inventory Value</span>
                    <strong>{formatCurrency(inventoryValue)}</strong>
                    <small>Price × available stock</small>
                </article>
            </section>

            <section className="admin-sales-analytics">
                <div className="admin-section-heading">
                    <div>
                        <h2>Sales Analytics</h2>
                        <p>
                            Track revenue from delivered orders and
                            your store's performance.
                        </p>
                    </div>
                </div>

                <div className="admin-stats">
                    <article className="admin-stat-card">
                        <span>Delivered Revenue</span>
                        <strong>{formatCurrency(totalRevenue)}</strong>
                        <small>Revenue from delivered orders</small>
                    </article>

                    <article className="admin-stat-card">
                        <span>Total Orders</span>
                        <strong>{totalOrders}</strong>
                        <small>All order statuses</small>
                    </article>

                    <article className="admin-stat-card">
                        <span>Average Delivered Order</span>
                        <strong>{formatCurrency(averageOrderValue)}</strong>
                        <small>Average value of delivered orders</small>
                    </article>
                </div>
            </section>

            <section className="admin-analytics-extra">
                <div className="analytics-panel">
                    <h2>Monthly Sales</h2>
                    <p className="analytics-subtitle">
                        Delivered-order revenue over the last six months
                    </p>

                    <div className="sales-chart">
                        {monthlySales.map((month) => (
                            <div
                                className="sales-chart-column"
                                key={month.key}
                            >
                                <span className="sales-chart-value">
                                    {formatCurrency(month.revenue)}
                                </span>

                                <div className="sales-chart-track">
                                    <div
                                        className="sales-chart-bar"
                                        style={{
                                            height:
                                                month.revenue > 0
                                                    ? `${Math.max(
                                                        (month.revenue /
                                                            maxMonthlyRevenue) *
                                                        100,
                                                        4
                                                    )}%`
                                                    : "0%",
                                        }}
                                        title={`${month.label}: ${formatCurrency(
                                            month.revenue
                                        )}`}
                                    />
                                </div>

                                <span className="sales-chart-label">
                                    {month.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="analytics-panel">
                    <h2>Best-Selling Products</h2>
                    <p className="analytics-subtitle">
                        Ranked by units sold in delivered orders
                    </p>

                    {bestSellingProducts.length > 0 ? (
                        <div className="best-selling-list">
                            {bestSellingProducts.map((product, index) => (
                                <div
                                    className="best-selling-item"
                                    key={product.name}
                                >
                                    <div className="best-selling-rank">
                                        {index + 1}
                                    </div>

                                    <div className="best-selling-info">
                                        <strong>{product.name}</strong>
                                        <span>
                                            {product.quantity}{" "}
                                            {product.quantity === 1
                                                ? "unit"
                                                : "units"}{" "}
                                            sold
                                        </span>
                                    </div>

                                    <strong className="best-selling-revenue">
                                        {formatCurrency(product.revenue)}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="analytics-empty">
                            No delivered product sales yet.
                        </p>
                    )}
                </div>
            </section>

            {message && (
                <div className="admin-message" role="status">
                    {message}
                </div>
            )}

            <section className="admin-products-section">
                <div className="admin-section-heading">
                    <div>
                        <h2>Product Management</h2>
                        <p>
                            View, update, and manage your product catalog.
                        </p>
                    </div>

                    <input
                        className="admin-search"
                        type="search"
                        placeholder="Search products..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />
                </div>

                {showForm && (
                    <form
                        className="admin-product-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="admin-form-heading">
                            <h3>
                                {editingId !== null
                                    ? "Edit Product"
                                    : "Add New Product"}
                            </h3>

                            <button
                                type="button"
                                className="admin-close-btn"
                                onClick={() => setShowForm(false)}
                                aria-label="Close form"
                            >
                                ×
                            </button>
                        </div>

                        <div className="admin-form-grid">
                            <label>
                                Product Name *
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    required
                                />
                            </label>

                            <label>
                                Category *
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                >
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Accessories">
                                        Accessories
                                    </option>
                                </select>
                            </label>

                            <label>
                                Price (₹) *
                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Old Price (₹)
                                <input
                                    name="oldPrice"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.oldPrice}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                Stock Quantity *
                                <input
                                    name="stock"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={form.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Badge
                                <input
                                    name="badge"
                                    value={form.badge}
                                    onChange={handleChange}
                                    placeholder="e.g. New Arrival"
                                />
                            </label>

                            <label className="admin-full-width">
                                Image URL
                                <input
                                    name="image"
                                    type="url"
                                    value={form.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/product.jpg"
                                />
                            </label>

                            <label className="admin-full-width">
                                Description
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Describe your product..."
                                />
                            </label>
                        </div>

                        {message && (
                            <p className="admin-form-message">
                                {message}
                            </p>
                        )}

                        <div className="admin-form-actions">
                            <button
                                type="button"
                                className="admin-secondary-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="admin-primary-btn"
                            >
                                {editingId !== null
                                    ? "Save Changes"
                                    : "Add Product"}
                            </button>
                        </div>
                    </form>
                )}

                <div className="admin-table-wrapper">
                    <table className="admin-product-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="admin-product-cell">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="admin-product-image"
                                                />
                                            ) : (
                                                <div className="admin-product-placeholder">
                                                    LC
                                                </div>
                                            )}

                                            <div>
                                                <strong>{product.name}</strong>
                                                {product.badge && (
                                                    <small>{product.badge}</small>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    <td>{product.category}</td>

                                    <td>
                                        {formatCurrency(product.price)}
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                Number(product.stock || 0) <= 5
                                                    ? "admin-stock low"
                                                    : "admin-stock"
                                            }
                                        >
                                            {Number(product.stock || 0)}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="admin-action-buttons">
                                            <button
                                                className="admin-edit-btn"
                                                onClick={() =>
                                                    openEditForm(product)
                                                }
                                                type="button"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="admin-delete-btn"
                                                onClick={() =>
                                                    handleDelete(product)
                                                }
                                                type="button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="admin-empty">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default AdminDashboard;
