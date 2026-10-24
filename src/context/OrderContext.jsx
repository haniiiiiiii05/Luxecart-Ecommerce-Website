
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import { useAuth } from "./AuthContext";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
    const { user, isAdmin } = useAuth();

    const [allOrders, setAllOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem("luxecartOrders");
            return savedOrders ? JSON.parse(savedOrders) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "luxecartOrders",
            JSON.stringify(allOrders)
        );
    }, [allOrders]);

    // Customers can see only their own orders.
    const orders = user?.email
        ? allOrders.filter(
            (order) =>
                order.customerEmail?.trim().toLowerCase() ===
                user.email.trim().toLowerCase()
        )
        : [];

    // Admin can see all orders.
    const adminOrders = isAdmin ? allOrders : [];

    // Add an order for the currently logged-in customer.
    const addOrder = (order) => {
        if (!user?.email) {
            throw new Error("Please log in before placing an order.");
        }

        const newOrder = {
            ...order,
            id: order.id || `ORD-${Date.now()}`,
            customerEmail: user.email.trim().toLowerCase(),
            status: order.status || "Pending",
        };

        setAllOrders((previousOrders) => [
            ...previousOrders,
            newOrder,
        ]);

        return newOrder;
    };

    // Update an order's status from the admin dashboard.
    const updateOrderStatus = (orderId, newStatus) => {
        if (!isAdmin) {
            throw new Error("Only an admin can update order statuses.");
        }

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!allowedStatuses.includes(newStatus)) {
            throw new Error("Invalid order status.");
        }

        setAllOrders((previousOrders) =>
            previousOrders.map((order) =>
                String(order.id) === String(orderId)
                    ? { ...order, status: newStatus }
                    : order
            )
        );
    };

    // Clear only the current customer's orders.
    const clearOrders = () => {
        if (!user?.email) return;

        const currentEmail = user.email.trim().toLowerCase();

        setAllOrders((previousOrders) =>
            previousOrders.filter(
                (order) =>
                    order.customerEmail?.trim().toLowerCase() !==
                    currentEmail
            )
        );
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                adminOrders,
                addOrder,
                updateOrderStatus,
                clearOrders,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);

    if (context === null) {
        throw new Error(
            "useOrders must be used inside OrderProvider"
        );
    }

    return context;
}
