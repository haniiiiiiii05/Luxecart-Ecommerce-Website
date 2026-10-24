import React, { useCallback, useEffect, useMemo, useState } from "react";
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


function Shop() {
    const location = useLocation();
    const navigate = useNavigate();
    const { products } = useProducts();

    const getCategoryFromUrl = useCallback(() => {
        const value = new URLSearchParams(location.search).get("category");
        return categories.some(
            (category) => category.toLowerCase() === value?.toLowerCase()
        )
            ? categories.find(
                (category) => category.toLowerCase() === value?.toLowerCase()
            )
            : "All";
    }, [location.search]);

    const [selectedCategory, setSelectedCategory] = useState(getCategoryFromUrl);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const { wishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        setSelectedCategory(getCategoryFromUrl());
    }, [getCategoryFromUrl]);

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
    }, [products, selectedCategory, searchTerm, sortBy, priceRange]);

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