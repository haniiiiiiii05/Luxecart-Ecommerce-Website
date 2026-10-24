
import React, { useState } from "react";
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    FaSearch,
    FaHeart,
    FaChevronDown,
    FaShoppingCart,
    FaClipboardList,
} from "react-icons/fa";

import { BiSolidShoppingBags } from "react-icons/bi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";


const categories = [
    { name: "Men", slug: "men" },
    { name: "Women", slug: "women" },
    { name: "Shoes", slug: "shoes" },
    { name: "Accessories", slug: "accessories" },
];

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const { wishlist } = useWishlist();
    const { cart } = useCart();

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const categoryActive =
        location.pathname.startsWith("/category") ||
        categories.some(
            (category) =>
                location.pathname === `/shop` &&
                new URLSearchParams(location.search).get("category") ===
                category.name
        );

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleSearch = (event) => {
        event?.preventDefault();

        const search = searchText.trim();

        if (search) {
            navigate(`/shop?search=${encodeURIComponent(search)}`);
            setSearchOpen(false);
            setSearchText("");
            closeMobileMenu();
        }
    };

    const handleCategoryClick = (category) => {
        navigate(`/shop?category=${encodeURIComponent(category.name)}`);
        closeMobileMenu();
    };

    const cartCount = cart.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
    );

    return (
        <nav className="luxecart-navbar">
            <div className="container navbar-container">
                {/* LOGO */}
                <Link
                    to="/"
                    className="luxecart-logo"
                    onClick={closeMobileMenu}
                >
                    <span className="logo-icon">
                        <BiSolidShoppingBags />
                    </span>
                    <span>LuxeCart</span>
                </Link>

                {/* MOBILE MENU BUTTON */}
                <button
                    type="button"
                    className="mobile-menu-toggle"
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* NAVIGATION LINKS */}
                <div
                    className={`navbar-links ${mobileMenuOpen ? "mobile-menu-open" : ""
                        }`}
                >
                    <NavLink
                        to="/"
                        end
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/shop"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                            `nav-link ${isActive && !categoryActive ? "active" : ""
                            }`
                        }
                    >
                        Shop
                    </NavLink>

                    {/* CATEGORY DROPDOWN */}
                    <div
                        className={`nav-dropdown ${categoryActive ? "category-active" : ""
                            }`}
                    >
                        <button
                            type="button"
                            className={`nav-link category-link ${categoryActive ? "active" : ""
                                }`}
                            aria-haspopup="true"
                            aria-expanded={undefined}
                        >
                            Categories
                            <FaChevronDown className="category-chevron" />
                        </button>

                        <div className="dropdown-menu">
                            {categories.map((category) => (
                                <button
                                    type="button"
                                    key={category.slug}
                                    className="dropdown-item"
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                >
                                    <span>{category.name}</span>
                                    <span className="dropdown-arrow">→</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <NavLink
                        to="/about"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                        }
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/contact"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                        }
                    >
                        Contact
                    </NavLink>

                    {/* MOBILE SEARCH */}
                    <form
                        className="mobile-search-form"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="search"
                            placeholder="Search products..."
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                            aria-label="Search products"
                        />
                        <button type="submit" aria-label="Submit search">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                {/* RIGHT-SIDE ACTIONS */}
                <div className="navbar-actions">
                    <div className="search-wrapper">
                        <button
                            type="button"
                            className="search-btn"
                            aria-label="Toggle product search"
                            aria-expanded={searchOpen}
                            onClick={() =>
                                setSearchOpen((prev) => !prev)
                            }
                        >
                            <FaSearch />
                        </button>

                        {searchOpen && (
                            <form
                                className="search-box"
                                onSubmit={handleSearch}
                            >
                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    value={searchText}
                                    onChange={(event) =>
                                        setSearchText(event.target.value)
                                    }
                                    aria-label="Search products"
                                    autoFocus
                                />

                                <button
                                    type="submit"
                                    className="search-submit"
                                    aria-label="Submit search"
                                >
                                    <FaSearch />
                                </button>
                            </form>
                        )}
                    </div>

                    <Link
                        to="/wishlist"
                        className="nav-icon"
                        aria-label={`Wishlist, ${wishlist.length} items`}
                    >
                        <FaHeart />

                        {wishlist.length > 0 && (
                            <span className="icon-badge">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/cart"
                        className="nav-icon"
                        aria-label={`Shopping cart, ${cartCount} items`}
                    >
                        <FaShoppingCart />

                        {cartCount > 0 && (
                            <span className="icon-badge">{cartCount}</span>
                        )}
                    </Link>

                    <Link
                        to="/orders"
                        className="nav-icon"
                        aria-label="My orders"
                    >
                        <FaClipboardList />
                    </Link>

                    {user ? (
                        <div>
                            <span>Welcome, {user.name}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <button onClick={() => navigate("/login")}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
