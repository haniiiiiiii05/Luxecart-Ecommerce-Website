import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiHeart,
    FiShoppingBag,
    FiTrash2,
    FiArrowRight,
} from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "./Wishlist.css";

function Wishlist() {
    const navigate = useNavigate();

    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleRemove = (product) => {
        toggleWishlist(product);
    };

    const handleAddToCart = (product) => {
        if (addToCart) {
            addToCart(product);
            navigate("/cart");
        }
    };

    return (
        <main className="wishlist-page">
            <section className="wishlist-hero">
                <div className="wishlist-hero-content">
                    <span className="wishlist-eyebrow">
                        YOUR PERSONAL COLLECTION
                    </span>

                    <h1>
                        Your <span>Wishlist</span>
                    </h1>

                    <p>
                        Keep the pieces you love close. Your favorite finds,
                        all in one beautiful place.
                    </p>

                    <div className="wishlist-count">
                        <FiHeart />
                        <span>
                            {wishlist.length}{" "}
                            {wishlist.length === 1 ? "item" : "items"} saved
                        </span>
                    </div>
                </div>
            </section>

            <section className="wishlist-container">
                {wishlist.length === 0 ? (
                    <div className="wishlist-empty">
                        <div className="wishlist-empty-icon">
                            <FiHeart />
                        </div>

                        <span className="wishlist-eyebrow">
                            NOTHING SAVED YET
                        </span>

                        <h2>Your wishlist is waiting</h2>

                        <p>
                            Explore our collection and save the pieces you love.
                            They will be waiting here when you return.
                        </p>

                        <Link to="/shop" className="wishlist-shop-btn">
                            Explore Collection <FiArrowRight />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="wishlist-heading">
                            <div>
                                <span className="wishlist-eyebrow">
                                    YOUR FAVORITES
                                </span>
                                <h2>Saved for later</h2>
                            </div>

                            <Link to="/shop" className="wishlist-continue-link">
                                Continue Shopping <FiArrowRight />
                            </Link>
                        </div>

                        <div className="wishlist-grid">
                            {wishlist.map((product) => (
                                <article
                                    className="wishlist-card"
                                    key={product.id}
                                >
                                    <div className="wishlist-card-image">
                                        <Link
                                            to={`/ product / ${product.id} `}
                                            state={{ product }}
                                            className="wishlist-image-link"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                            />
                                        </Link>

                                        <button
                                            type="button"
                                            className="wishlist-remove-btn"
                                            onClick={() => handleRemove(product)}
                                            aria-label={`Remove ${product.name} from wishlist`}
                                            title="Remove from wishlist"
                                        >
                                            <FiTrash2 />
                                        </button>

                                        {product.category && (
                                            <span className="wishlist-product-category">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="wishlist-card-details">
                                        <Link
                                            to={`/ product / ${product.id} `}
                                            state={{ product }}
                                            className="wishlist-product-name"
                                        >
                                            {product.name}
                                        </Link>

                                        <div className="wishlist-price">
                                            ₹{Number(product.price || 0).toLocaleString("en-IN")}
                                        </div>

                                        <div className="wishlist-card-actions">
                                            <button
                                                type="button"
                                                className="wishlist-add-btn"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                <FiShoppingBag />
                                                Add to Cart
                                            </button>

                                            <button
                                                type="button"
                                                className="wishlist-delete-btn"
                                                onClick={() => handleRemove(product)}
                                                aria-label={`Delete ${product.name} `}
                                                title="Remove item"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}

export default Wishlist;
