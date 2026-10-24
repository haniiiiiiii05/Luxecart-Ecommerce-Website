
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const ADMIN_EMAIL = "admin@luxecart.com";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("luxecartUser")
            ) || null;
        } catch {
            return null;
        }
    });

    const isAdmin =
        user?.email?.trim().toLowerCase() === ADMIN_EMAIL;

    const signup = (name, email, password) => {
        const users = JSON.parse(
            localStorage.getItem("luxecartUsers") || "[]"
        );

        const normalizedEmail = email.trim().toLowerCase();

        if (
            users.some(
                (item) =>
                    item.email.trim().toLowerCase() === normalizedEmail
            )
        ) {
            throw new Error("This email is already registered.");
        }

        users.push({
            name: name.trim(),
            email: normalizedEmail,
            password,
        });

        localStorage.setItem(
            "luxecartUsers",
            JSON.stringify(users)
        );

        const newUser = {
            name: name.trim(),
            email: normalizedEmail,
        };

        localStorage.setItem(
            "luxecartUser",
            JSON.stringify(newUser)
        );

        setUser(newUser);
    };

    const login = (email, password) => {
        const users = JSON.parse(
            localStorage.getItem("luxecartUsers") || "[]"
        );

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = users.find(
            (item) =>
                item.email.trim().toLowerCase() === normalizedEmail &&
                item.password === password
        );

        if (!existingUser) {
            throw new Error("Invalid email or password.");
        }

        const loggedInUser = {
            name: existingUser.name,
            email: existingUser.email.trim().toLowerCase(),
        };

        localStorage.setItem(
            "luxecartUser",
            JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);
    };

    const logout = () => {
        localStorage.removeItem("luxecartUser");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAdmin, signup, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
