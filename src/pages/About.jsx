import React from "react";
import {
    FaGem,
    FaShippingFast,
    FaHeart,
    FaShieldAlt,
    FaLeaf,
    FaArrowRight,
    FaShoppingBag,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./About.css";

const features = [
    {
        icon: <FaGem />,
        title: "Premium Quality",
        description:
            "Every product is carefully selected for its quality, design, and lasting value.",
    },
    {
        icon: <FaShippingFast />,
        title: "Reliable Delivery",
        description:
            "We work to make your shopping experience convenient, smooth, and dependable.",
    },
    {
        icon: <FaHeart />,
        title: "Customer First",
        description:
            "Your satisfaction inspires us to improve every part of your shopping journey.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Secure Shopping",
        description:
            "We aim to provide a trusted shopping experience from browsing to checkout.",
    },
];

function About() {
    return (
        <main className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <span className="about-eyebrow">WELCOME TO LUXECART</span>

                    <h1>
                        Style That Speaks.
                        <br />
                        <span>Quality That Lasts.</span>
                    </h1>

                    <p>
                        Discover a world where timeless elegance meets modern living.
                        LuxeCart brings together thoughtfully selected products that
                        make every shopping experience feel special.
                    </p>

                    <Link to="/shop" className="about-primary-btn">
                        Explore Collection <FaArrowRight />
                    </Link>
                </div>

                <div className="about-hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85"
                        alt="Elegant fashion boutique interior"
                    />
                    <div className="about-image-caption">
                        <FaGem />
                        <span>Everyday Luxury, Thoughtfully Curated</span>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="about-story">
                <div className="about-story-image">
                    <img
                        src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=85"
                        alt="Carefully arranged clothing collection"
                        loading="lazy"
                    />
                </div>

                <div className="about-story-content">
                    <span className="about-eyebrow">OUR STORY</span>
                    <h2>More Than Shopping. It's a Lifestyle.</h2>

                    <p>
                        LuxeCart was created with a simple idea: shopping should be
                        inspiring, effortless, and enjoyable. We believe that the right
                        products can express your personality and complement your
                        everyday life.
                    </p>

                    <p>
                        From discovering new styles to finding timeless essentials,
                        our goal is to make it easier for you to explore products that
                        match your taste and lifestyle.
                    </p>

                    <Link to="/shop" className="about-text-link">
                        Discover Our Products <FaArrowRight />
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="about-features">
                <div className="about-section-heading">
                    <span className="about-eyebrow">THE LUXECART DIFFERENCE</span>
                    <h2>Why Shop With Us?</h2>
                    <p>
                        Thoughtful details, dependable service, and a shopping
                        experience designed around you.
                    </p>
                </div>

                <div className="about-feature-grid">
                    {features.map((feature, index) => (
                        <article className="about-feature-card" key={feature.title}>
                            <div className="about-feature-icon">{feature.icon}</div>
                            <span className="about-feature-number">
                                0{index + 1}
                            </span>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Mission and Vision */}
            <section className="about-mission">
                <div className="about-mission-content">
                    <span className="about-eyebrow">WHAT WE BELIEVE</span>
                    <h2>Our Mission & Vision</h2>

                    <div className="about-belief-item">
                        <div className="about-belief-icon">
                            <FaHeart />
                        </div>
                        <div>
                            <h3>Our Mission</h3>
                            <p>
                                To make online shopping simple and enjoyable by offering
                                carefully chosen products and a customer-focused experience.
                            </p>
                        </div>
                    </div>

                    <div className="about-belief-item">
                        <div className="about-belief-icon">
                            <FaLeaf />
                        </div>
                        <div>
                            <h3>Our Vision</h3>
                            <p>
                                To build a trusted shopping destination where great style,
                                quality, and convenience come together.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="about-mission-image">
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85"
                        alt="Fashion pieces arranged in a modern style"
                        loading="lazy"
                    />
                    <div className="about-mission-badge">
                        <FaShoppingBag />
                        <span>Made for Your Style</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <div className="about-cta-icon">
                    <FaGem />
                </div>
                <span className="about-eyebrow">YOUR STYLE JOURNEY STARTS HERE</span>
                <h2>Find Something You'll Love.</h2>
                <p>
                    Explore our collection and discover products that feel right for you.
                </p>
                <Link to="/shop" className="about-primary-btn">
                    Start Shopping <FaArrowRight />
                </Link>
            </section>
        </main>
    );
}

export default About;