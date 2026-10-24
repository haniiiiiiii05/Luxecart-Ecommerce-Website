import React from "react";
import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaShippingFast,
    FaShieldAlt,
    FaHeadset,
    FaStar,
    FaRegHeart,
    FaGem,
    FaLongArrowAltRight,
} from "react-icons/fa";
import "./Home.css";

const categories = [
    {
        name: "Men",
        description: "Elevate your everyday style",
        image:
            "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Women",
        description: "Discover timeless elegance",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Shoes",
        description: "Step into something special",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Accessories",
        description: "The details make the difference",
        image:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=85",
    },
];

const featuredProducts = [
    {
        id: 1,
        name: "Classic Everyday Jacket",
        category: "Men",
        price: 2499,
        oldPrice: 3299,
        label: "BESTSELLER",
        image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 2,
        name: "Elegant Women's Handbag",
        category: "Accessories",
        price: 1899,
        oldPrice: 2499,
        label: "POPULAR",
        image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 3,
        name: "Minimal Classic Sneakers",
        category: "Shoes",
        price: 2199,
        oldPrice: 2799,
        label: "NEW ARRIVAL",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 4,
        name: "Timeless Women's Outfit",
        category: "Women",
        price: 2799,
        oldPrice: 3499,
        label: "TRENDING",
        image:
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85",
    },
];

const benefits = [
    {
        icon: <FaShippingFast />,
        title: "Reliable Delivery",
        description: "Convenient delivery for your orders.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Secure Shopping",
        description: "A shopping experience you can trust.",
    },
    {
        icon: <FaGem />,
        title: "Curated Quality",
        description: "Products chosen with care.",
    },
    {
        icon: <FaHeadset />,
        title: "Customer Support",
        description: "We're here to help with your queries.",
    },
];

function Home() {
    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    return (
        <main className="home-page">
            {/* Hero Section */}
            <section className="home-hero">
                <div className="home-hero-content">
                    <span className="home-eyebrow">
                        <span className="home-eyebrow-line" />
                        THE ART OF EVERYDAY LUXURY
                    </span>

                    <h1>
                        Discover Your
                        <br />
                        <span>Signature Style.</span>
                    </h1>

                    <p>
                        Thoughtfully selected fashion and lifestyle essentials
                        for those who appreciate quality, confidence, and timeless design.
                    </p>

                    <div className="home-hero-actions">
                        <Link to="/shop" className="home-btn home-btn-primary">
                            Shop Collection <FaArrowRight />
                        </Link>

                        <Link to="/about" className="home-btn home-btn-outline">
                            Discover LuxeCart
                        </Link>
                    </div>

                    <div className="home-hero-note">
                        <span className="home-note-icon">
                            <FaGem />
                        </span>
                        <div>
                            <strong>Thoughtful Style</strong>
                            <span>Made for your everyday moments</span>
                        </div>
                    </div>
                </div>

                <div className="home-hero-visual">
                    <div className="home-hero-image">
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85"
                            alt="Modern boutique with an elegant fashion collection"
                        />
                    </div>

                    <div className="home-hero-floating-card">
                        <span className="home-floating-icon">
                            <FaStar />
                        </span>
                        <div>
                            <strong>Elevate Your Look</strong>
                            <p>Explore your next favourite</p>
                        </div>
                    </div>

                    <div className="home-hero-side-text">STYLE · QUALITY · COMFORT</div>
                </div>
            </section>

            {/* Benefits */}
            <section className="home-benefits">
                {benefits.map((benefit) => (
                    <div className="home-benefit" key={benefit.title}>
                        <div className="home-benefit-icon">{benefit.icon}</div>
                        <div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Categories */}
            <section className="home-categories section-spacing">
                <div className="home-section-heading">
                    <div>
                        <span className="home-eyebrow">EXPLORE OUR WORLD</span>
                        <h2>Shop by Category</h2>
                        <p>Find the pieces that match your personal style.</p>
                    </div>

                    <Link to="/shop" className="home-view-all">
                        View All Products <FaArrowRight />
                    </Link>
                </div>

                <div className="home-category-grid">
                    {categories.map((category, index) => (
                        <Link
                            to={`/shop?category=${encodeURIComponent(category.name)}`}
                            className={`home-category-card home-category-card-${index + 1}`}
                            key={category.name}
                        >
                            <img src={category.image} alt={category.name} loading="lazy" />
                            <div className="home-category-overlay" />
                            <div className="home-category-content">
                                <span>{category.description}</span>
                                <h3>{category.name}</h3>
                                <span className="home-category-link">
                                    Explore <FaArrowRight />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="home-featured section-spacing">
                <div className="home-section-heading">
                    <div>
                        <span className="home-eyebrow">SELECTED FOR YOU</span>
                        <h2>Featured Collection</h2>
                        <p>Discover pieces that bring together style and everyday comfort.</p>
                    </div>

                    <Link to="/shop" className="home-view-all">
                        Shop All <FaArrowRight />
                    </Link>
                </div>

                <div className="home-product-grid">
                    {featuredProducts.map((product) => (
                        <article className="home-product-card" key={product.id}>
                            <Link
                                to={`/shop?category=${encodeURIComponent(product.category)}`}
                                className="home-product-image"
                                aria-label={`Explore ${product.name}`}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                />

                                <span className="home-product-label">{product.label}</span>
                                <span className="home-product-quick-link">
                                    Explore <FaLongArrowAltRight />
                                </span>
                            </Link>

                            <div className="home-product-info">
                                <span className="home-product-category">{product.category}</span>

                                <h3>
                                    <Link
                                        to={`/shop?category=${encodeURIComponent(product.category)}`}
                                    >
                                        {product.name}
                                    </Link>
                                </h3>

                                <div className="home-product-price">
                                    <strong>{formatPrice(product.price)}</strong>
                                    <del>{formatPrice(product.oldPrice)}</del>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="home-featured-bottom">
                    <Link to="/shop" className="home-btn home-btn-primary">
                        Explore All Products <FaArrowRight />
                    </Link>
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="home-promo">
                <div className="home-promo-image">
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=85"
                        alt="Carefully styled fashion collection"
                        loading="lazy"
                    />
                </div>

                <div className="home-promo-content">
                    <span className="home-eyebrow">LESS, BUT BETTER</span>
                    <h2>Good Style Never Goes Out of Fashion.</h2>
                    <p>
                        Build a wardrobe and lifestyle you love with timeless pieces
                        selected to make every day feel a little more special.
                    </p>
                    <Link to="/shop" className="home-btn home-btn-light">
                        Find Your Style <FaArrowRight />
                    </Link>
                </div>
            </section>

            {/* Brand Statement */}
            <section className="home-brand-statement">
                <span className="home-brand-icon">
                    <FaRegHeart />
                </span>
                <span className="home-eyebrow">THE LUXECART PROMISE</span>
                <h2>Good Things. Great Style. A Better Shopping Experience.</h2>
                <p>
                    We believe great shopping is about more than products.
                    It's about discovering what you love and making it yours.
                </p>
                <Link to="/about" className="home-text-link">
                    Learn More About Us <FaArrowRight />
                </Link>
            </section>

            {/* Newsletter */}
            <section className="home-newsletter">
                <div>
                    <span className="home-eyebrow">STAY IN THE LOOP</span>
                    <h2>A Little Luxury in Your Inbox.</h2>
                    <p>
                        Be the first to explore new collections, style inspiration,
                        and the latest updates from LuxeCart.
                    </p>
                </div>

                <Link to="/shop" className="home-btn home-btn-primary">
                    Explore LuxeCart <FaArrowRight />
                </Link>
            </section>
        </main>
    );
}

export default Home;