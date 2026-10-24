import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaSearch,
    FaHeart,
    FaRegHeart,
    FaShoppingBag,
    FaSlidersH,
    FaTimes,
    FaArrowRight,
    FaSortAmountDown,
} from "react-icons/fa";
import "./Shop.css";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";

const categories = ["All", "Men", "Women", "Shoes", "Accessories"];

// Sample products: replace these with your actual product data when ready.
const products = [
    {
        id: 1,
        name: "Classic Everyday Jacket",
        category: "Men",
        price: 2499,
        oldPrice: 3299,
        image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=85",
        badge: "BESTSELLER",
        description: "A versatile jacket designed for effortless everyday style.",
    },
    {
        id: 2,
        name: "Elegant Women's Handbag",
        category: "Accessories",
        price: 1899,
        oldPrice: 2499,
        image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
        badge: "POPULAR",
        description: "A timeless accessory for everyday essentials.",
    },
    {
        id: 3,
        name: "Minimal Classic Sneakers",
        category: "Shoes",
        price: 2199,
        oldPrice: 2799,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
        badge: "NEW ARRIVAL",
        description: "Comfortable sneakers with a clean, modern look.",
    },
    {
        id: 4,
        name: "Timeless Women's Outfit",
        category: "Women",
        price: 2799,
        oldPrice: 3499,
        image:
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85",
        badge: "TRENDING",
        description: "An elegant outfit for everyday and special occasions.",
    },
    {
        id: 5,
        name: "Modern Casual Shirt",
        category: "Men",
        price: 1299,
        oldPrice: 1699,
        image:
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "A versatile shirt that pairs easily with everyday outfits.",
    },
    {
        id: 6,
        name: "Women's Classic Dress",
        category: "Women",
        price: 2399,
        oldPrice: 2999,
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85",
        badge: "POPULAR",
        description: "A classic silhouette with a sophisticated finish.",
    },
    {
        id: 7,
        name: "Everyday Wristwatch",
        category: "Accessories",
        price: 1599,
        oldPrice: 2199,
        image:
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "A minimal watch to complement your everyday look.",
    },
    {
        id: 8,
        name: "Premium Casual Shoes",
        category: "Shoes",
        price: 1999,
        oldPrice: 2599,
        image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85",
        badge: "SALE",
        description: "Everyday footwear designed with comfort in mind.",
    },
    {
        id: 9,
        name: "Essential Men's T-Shirt",
        category: "Men",
        price: 799,
        oldPrice: 999,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "A wardrobe essential with a clean, relaxed fit.",
    },
    {
        id: 10,
        name: "Women's Shoulder Bag",
        category: "Accessories",
        price: 1699,
        oldPrice: 2199,
        image:
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",
        badge: "NEW ARRIVAL",
        description: "A practical shoulder bag with an elegant design.",
    },
    {
        id: 11,
        name: "Elegant Women's Heels",
        category: "Shoes",
        price: 2299,
        oldPrice: 2899,
        image:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "Elegant footwear for a polished look.",
    },
    {
        id: 12,
        name: "Women's Casual Top",
        category: "Women",
        price: 1199,
        oldPrice: 1499,
        image:
            "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "An easy-to-style top for your everyday wardrobe.",
    },
];

function Shop() {
    const location = useLocation();
    const navigate = useNavigate();
    const { products } = useProducts();

    const getCategoryFromUrl = () => {
        const value = new URLSearchParams(location.search).get("category");
        return categories.some(
            (category) => category.toLowerCase() === value?.toLowerCase()
        )
            ? categories.find(
                (category) => category.toLowerCase() === value?.toLowerCase()
            )
            : "All";
    };

    const [selectedCategory, setSelectedCategory] = useState(getCategoryFromUrl);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const { wishlist, toggleWishlist } = useWishlist();

    React.useEffect(() => {
        setSelectedCategory(getCategoryFromUrl());
    }, [location.search]);

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== "All") {
            result = result.filter(
                (product) =>
                    product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        if (searchTerm.trim()) {
            const search = searchTerm.trim().toLowerCase();

            result = result.filter(
                (product) =>
                    product.name.toLowerCase().includes(search) ||
                    product.category.toLowerCase().includes(search) ||
                    product.description.toLowerCase().includes(search)
            );
        }

        if (priceRange === "under1000") {
            result = result.filter((product) => product.price < 1000);
        } else if (priceRange === "1000to2000") {
            result = result.filter(
                (product) => product.price >= 1000 && product.price <= 2000
            );
        } else if (priceRange === "2000to3000") {
            result = result.filter(
                (product) => product.price > 2000 && product.price <= 3000
            );
        } else if (priceRange === "above3000") {
            result = result.filter((product) => product.price > 3000);
        }

        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [selectedCategory, searchTerm, sortBy, priceRange]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);

        const params = new URLSearchParams(location.search);
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        navigate(
            {
                pathname: "/shop",
                search: params.toString() ? `?${params.toString()}` : "",
            },
            { replace: true }
        );
    };


    const clearFilters = () => {
        setSearchTerm("");
        setPriceRange("all");
        setSortBy("featured");
        handleCategoryChange("All");
    };

    return (
        <main className="shop-page">
            {/* Shop Hero */}
            <section className="shop-hero">
                <div className="shop-hero-content">
                    <span className="shop-eyebrow">THE LUXECART COLLECTION</span>
                    <h1>Find Your Style.</h1>
                    <p>
                        Discover timeless essentials, contemporary fashion, and
                        thoughtfully selected accessories for every occasion.
                    </p>

                    <div className="shop-hero-note">
                        <FaShoppingBag />
                        <span>Explore our latest collection</span>
                    </div>
                </div>

                <div className="shop-hero-decoration">
                    <span>L</span>
                    <div>STYLE · QUALITY · COMFORT</div>
                </div>
            </section>

            {/* Shop Content */}
            <section className="shop-content">
                <div className="shop-breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <span>Shop</span>
                    {selectedCategory !== "All" && (
                        <>
                            <span>/</span>
                            <span>{selectedCategory}</span>
                        </>
                    )}
                </div>

                <div className="shop-heading">
                    <div>
                        <span className="shop-eyebrow">CURATED FOR YOU</span>
                        <h2>
                            {selectedCategory === "All"
                                ? "All Products"
                                : `${selectedCategory} Collection`}
                        </h2>
                        <p>Find something you'll love.</p>
                    </div>

                    <div className="shop-heading-count">
                        <strong>{filteredProducts.length}</strong>
                        <span>
                            {filteredProducts.length === 1 ? "product" : "products"}
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="shop-toolbar">
                    <div className="shop-search">
                        <FaSearch />
                        <input
                            type="search"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            aria-label="Search products"
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                className="shop-search-clear"
                                onClick={() => setSearchTerm("")}
                                aria-label="Clear search"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    <div className="shop-toolbar-actions">
                        <button
                            type="button"
                            className={`shop-filter-toggle ${showFilters ? "active" : ""}`}
                            onClick={() => setShowFilters((value) => !value)}
                        >
                            <FaSlidersH /> Filters
                        </button>

                        <label className="shop-sort">
                            <FaSortAmountDown />
                            <select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                aria-label="Sort products"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </label>
                    </div>
                </div>

                {/* Category filters */}
                <div className="shop-category-filters">
                    {categories.map((category) => (
                        <button
                            type="button"
                            key={category}
                            className={`shop-category-btn ${selectedCategory === category ? "active" : ""
                                }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Expandable filters */}
                {showFilters && (
                    <div className="shop-filter-panel">
                        <div className="shop-filter-group">
                            <label htmlFor="shop-price-range">Price Range</label>
                            <select
                                id="shop-price-range"
                                value={priceRange}
                                onChange={(event) => setPriceRange(event.target.value)}
                            >
                                <option value="all">All Prices</option>
                                <option value="under1000">Under ₹1,000</option>
                                <option value="1000to2000">₹1,000 – ₹2,000</option>
                                <option value="2000to3000">₹2,001 – ₹3,000</option>
                                <option value="above3000">Above ₹3,000</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            className="shop-clear-filters"
                            onClick={clearFilters}
                        >
                            Clear all filters <FaTimes />
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="shop-product-grid">
                        {filteredProducts.map((product) => {
                            const isWishlisted = wishlist.some(
                                (item) => String(item.id) === String(product.id)
                            );
                            return (
                                <article className="shop-product-card" key={product.id}>
                                    <div className="shop-product-image-wrap">
                                        <button
                                            type="button"
                                            className={`shop-wishlist-btn ${isWishlisted ? "wishlisted" : ""
                                                }`}
                                            onClick={() => toggleWishlist(product)}
                                            aria-label={
                                                isWishlisted
                                                    ? `Remove ${product.name} from wishlist`
                                                    : `Add ${product.name} to wishlist`
                                            }
                                        >
                                            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                                        </button>

                                        {product.badge && (
                                            <span className="shop-product-badge">
                                                {product.badge}
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            className="shop-product-image-button"
                                            onClick={() =>
                                                navigate(`/product/${product.id}`, {
                                                    state: { product },
                                                })
                                            }
                                            aria-label={`View ${product.name}`}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                            />
                                        </button>

                                        <button
                                            type="button"
                                            className="shop-quick-view"
                                            onClick={() =>
                                                navigate(`/product/${product.id}`, {
                                                    state: { product },
                                                })
                                            }
                                        >
                                            View Product <FaArrowRight />
                                        </button>
                                    </div>

                                    <div className="shop-product-details">
                                        <span className="shop-product-category">
                                            {product.category}
                                        </span>

                                        <h3>
                                            <button
                                                type="button"
                                                className="shop-product-name"
                                                onClick={() =>
                                                    navigate(`/product/${product.id}`, {
                                                        state: { product },
                                                    })
                                                }
                                            >
                                                {product.name}
                                            </button>
                                        </h3>

                                        <p className="shop-product-description">
                                            {product.description}
                                        </p>

                                        <div className="shop-product-prices">
                                            <strong>{formatPrice(product.price)}</strong>
                                            {product.oldPrice > product.price && (
                                                <del>{formatPrice(product.oldPrice)}</del>
                                            )}
                                        </div>

                                        <div className="shop-product-bottom">
                                            <span className="shop-stock-indicator">
                                                <span />
                                                Available
                                            </span>

                                            <button
                                                type="button"
                                                className="shop-view-arrow"
                                                onClick={() =>
                                                    navigate(`/product/${product.id}`, {
                                                        state: { product },
                                                    })
                                                }
                                                aria-label={`View ${product.name}`}
                                            >
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="shop-empty-state">
                        <div className="shop-empty-icon">
                            <FaSearch />
                        </div>
                        <h3>No products found</h3>
                        <p>
                            We couldn't find any products matching your search or filters.
                            Try another search or clear your filters.
                        </p>
                        <button
                            type="button"
                            className="shop-empty-button"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Bottom Banner */}
                <section className="shop-bottom-banner">
                    <div>
                        <span className="shop-eyebrow">THE LUXECART EXPERIENCE</span>
                        <h2>Discover Pieces That Feel Like You.</h2>
                        <p>
                            Explore thoughtfully selected styles and find your next
                            favourite addition.
                        </p>
                    </div>

                    <Link to="/about" className="shop-banner-link">
                        Our Story <FaArrowRight />
                    </Link>
                </section>
            </section>
        </main>
    );
}

export default Shop;