
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiArrowRight,
    FiShoppingBag,
    FiWatch,
    FiSmartphone,
    FiHome,
    FiHeart,
    FiTag
} from "react-icons/fi";
import "./Category.css";

const categories = [
    {
        id: 1,
        name: "Fashion",
        description: "Discover timeless styles for every occasion.",
        image:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
        icon: <FiShoppingBag />,
        value: "Fashion"
    },
    {
        id: 2,
        name: "Accessories",
        description: "Complete your look with elegant details.",
        image:
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80",
        icon: <FiWatch />,
        value: "Accessories"
    },
    {
        id: 3,
        name: "Electronics",
        description: "Explore smart technology for everyday life.",
        image:
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
        icon: <FiSmartphone />,
        value: "Electronics"
    },
    {
        id: 4,
        name: "Home & Living",
        description: "Bring comfort and style into your home.",
        image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
        icon: <FiHome />,
        value: "Home"
    },
    {
        id: 5,
        name: "Beauty",
        description: "Find your everyday beauty essentials.",
        image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        icon: <FiHeart />,
        value: "Beauty"
    },
    {
        id: 6,
        name: "Sale & Offers",
        description: "Explore special picks and great deals.",
        image:
            "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80",
        icon: <FiTag />,
        value: "Sale"
    }
];

function Category() {
    const navigate = useNavigate();

    const openCategory = (category) => {
        navigate(`/shop?category=${encodeURIComponent(category)}`);
    };

    return (
        <main className="category-page">
            {/* Header */}
            <section className="category-hero">
                <div className="category-hero-content">
                    <span className="category-eyebrow">
                        CURATED FOR YOU
                    </span>

                    <h1>
                        Shop by <span>Category</span>
                    </h1>

                    <p>
                        Explore thoughtfully selected collections designed
                        to bring style, quality, and elegance into your life.
                    </p>

                    <Link to="/shop" className="category-hero-btn">
                        Explore All Products <FiArrowRight />
                    </Link>
                </div>

                <div className="category-hero-decoration">
                    <FiShoppingBag />
                </div>
            </section>

            {/* Categories */}
            <section className="category-section">
                <div className="category-section-heading">
                    <div>
                        <span className="category-small-title">
                            FIND YOUR STYLE
                        </span>

                        <h2>Explore Our Collections</h2>

                        <p>
                            Find something special in every collection.
                        </p>
                    </div>

                    <Link to="/shop" className="category-view-all">
                        View all products <FiArrowRight />
                    </Link>
                </div>

                <div className="category-grid">
                    {categories.map((category) => (
                        <button
                            type="button"
                            className="category-card"
                            key={category.id}
                            onClick={() => openCategory(category.value)}
                            aria-label={`Explore ${category.name} products`}
                        >
                            <div className="category-card-image">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    loading="lazy"
                                />

                                <span className="category-card-icon">
                                    {category.icon}
                                </span>

                                <span className="category-card-arrow">
                                    <FiArrowRight />
                                </span>
                            </div>

                            <div className="category-card-content">
                                <h3>{category.name}</h3>

                                <p>{category.description}</p>

                                <span className="category-shop-link">
                                    Explore collection <FiArrowRight />
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Bottom banner */}
            <section className="category-bottom-banner">
                <div>
                    <span>THE LUXECART EXPERIENCE</span>
                    <h2>Discover your next favourite.</h2>
                    <p>
                        Explore our collections and find products that fit
                        your personal style.
                    </p>
                </div>

                <button
                    type="button"
                    className="category-bottom-btn"
                    onClick={() => navigate("/shop")}
                >
                    Start Shopping <FiArrowRight />
                </button>
            </section>
        </main>
    );
}

export default Category;
