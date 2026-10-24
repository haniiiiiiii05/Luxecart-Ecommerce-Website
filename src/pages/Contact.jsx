import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaClock,
    FaArrowRight,
    FaPaperPlane,
    FaHeadset,
    FaQuestionCircle,
    FaCheckCircle,
} from "react-icons/fa";
import "./Contact.css";

const contactDetails = [
    {
        icon: <FaEnvelope />,
        title: "Email Us",
        value: "support@luxecart.com",
        description: "For general questions and order enquiries",
        href: "mailto:support@luxecart.com",
    },
    {
        icon: <FaPhoneAlt />,
        title: "Call Us",
        value: "+91 98765 43210",
        description: "For assistance with your shopping experience",
        href: "tel:+919876543210",
    },
    {
        icon: <FaMapMarkerAlt />,
        title: "Our Location",
        value: "Ahmedabad, Gujarat, India",
        description: "Our online store serves customers digitally",
        href: null,
    },
];

const faqs = [
    {
        question: "How can I track my order?",
        answer:
            "Visit the Orders section of your account to check your order details and available status information.",
    },
    {
        question: "Can I change or cancel an order?",
        answer:
            "Contact our support team with your order details as soon as possible. Changes depend on your order status and store policies.",
    },
    {
        question: "How can I get help with a product?",
        answer:
            "Send us a message using the contact form with the product name and your question. Our support team can guide you.",
    },
    {
        question: "How long does it take to receive a response?",
        answer:
            "We aim to respond to enquiries during our listed business hours. Actual response times may vary.",
    },
];

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        if (submitted) {
            setSubmitted(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Frontend confirmation only.
        // Connect a backend or email service to actually send messages.
        setSubmitted(true);

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <main className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <span className="contact-eyebrow">
                        WE'RE HERE FOR YOU
                    </span>

                    <h1>
                        Let's Start a
                        <br />
                        <span>Conversation.</span>
                    </h1>

                    <p>
                        Have a question, need help with an order, or simply want to
                        share your thoughts? We'd love to hear from you.
                    </p>

                    <a href="#contact-form" className="contact-hero-btn">
                        Get in Touch <FaArrowRight />
                    </a>
                </div>

                <div className="contact-hero-visual">
                    <img
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85"
                        alt="Team working together to support customers"
                    />

                    <div className="contact-hero-card">
                        <div className="contact-hero-card-icon">
                            <FaHeadset />
                        </div>
                        <div>
                            <strong>We're Happy to Help</strong>
                            <span>Your experience matters to us.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="contact-info-section">
                <div className="contact-section-heading">
                    <span className="contact-eyebrow">CONTACT INFORMATION</span>
                    <h2>Choose How to Reach Us</h2>
                    <p>
                        Find the best way to get in touch with the LuxeCart team.
                    </p>
                </div>

                <div className="contact-info-grid">
                    {contactDetails.map((item) => (
                        <article className="contact-info-card" key={item.title}>
                            <div className="contact-info-icon">{item.icon}</div>

                            <h3>{item.title}</h3>

                            {item.href ? (
                                <a className="contact-info-value" href={item.href}>
                                    {item.value}
                                </a>
                            ) : (
                                <span className="contact-info-value">{item.value}</span>
                            )}

                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Contact Form and Business Hours */}
            <section className="contact-main-section">
                <div className="contact-form-panel" id="contact-form">
                    <span className="contact-eyebrow">SEND US A MESSAGE</span>
                    <h2>How Can We Help?</h2>

                    <p className="contact-form-intro">
                        Fill in the details below and let us know what you need.
                    </p>

                    {submitted && (
                        <div className="contact-success-message" role="status">
                            <FaCheckCircle />
                            <span>
                                Thank you! Your form was submitted on this page. Connect an
                                email service or backend to deliver your message to our team.
                            </span>
                        </div>
                    )}

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="contact-form-row">
                            <div className="contact-field">
                                <label htmlFor="contact-name">Full Name *</label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="contact-field">
                                <label htmlFor="contact-email">Email Address *</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-field">
                            <label htmlFor="contact-subject">Subject *</label>
                            <select
                                id="contact-subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Choose a subject
                                </option>
                                <option value="Order Enquiry">Order Enquiry</option>
                                <option value="Product Information">
                                    Product Information
                                </option>
                                <option value="Returns and Refunds">
                                    Returns and Refunds
                                </option>
                                <option value="Payment Assistance">
                                    Payment Assistance
                                </option>
                                <option value="Feedback">Feedback</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="contact-field">
                            <label htmlFor="contact-message">Your Message *</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                placeholder="Tell us how we can help..."
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="contact-submit-btn">
                            Submit Message <FaPaperPlane />
                        </button>

                        <p className="contact-form-note">
                            Fields marked with * are required.
                        </p>
                    </form>
                </div>

                <aside className="contact-sidebar">
                    <div className="contact-hours-card">
                        <div className="contact-sidebar-icon">
                            <FaClock />
                        </div>

                        <span className="contact-eyebrow">WHEN TO REACH US</span>
                        <h3>Business Hours</h3>

                        <div className="contact-hours-row">
                            <span>Monday – Friday</span>
                            <strong>9 AM – 6 PM</strong>
                        </div>

                        <div className="contact-hours-row">
                            <span>Saturday</span>
                            <strong>10 AM – 4 PM</strong>
                        </div>

                        <div className="contact-hours-row">
                            <span>Sunday</span>
                            <strong>Closed</strong>
                        </div>

                        <p className="contact-hours-note">
                            All times are India Standard Time (IST). These are example
                            business hours and can be updated to match your actual support
                            schedule.
                        </p>
                    </div>

                    <div className="contact-help-card">
                        <FaQuestionCircle className="contact-help-icon" />

                        <h3>Need Quick Help?</h3>

                        <p>
                            You might find the answer to your question in our store pages.
                        </p>

                        <Link to="/orders" className="contact-sidebar-link">
                            View My Orders <FaArrowRight />
                        </Link>

                        <Link to="/shop" className="contact-sidebar-link">
                            Explore Products <FaArrowRight />
                        </Link>
                    </div>
                </aside>
            </section>

            {/* Frequently Asked Questions */}
            <section className="contact-faq-section">
                <div className="contact-section-heading">
                    <span className="contact-eyebrow">HELP CENTRE</span>
                    <h2>Frequently Asked Questions</h2>
                    <p>Quick answers to some common shopping questions.</p>
                </div>

                <div className="contact-faq-list">
                    {faqs.map((faq, index) => (
                        <article
                            className={`contact-faq-item ${openFaq === index ? "active" : ""
                                }`}
                            key={faq.question}
                        >
                            <button
                                type="button"
                                className="contact-faq-question"
                                onClick={() =>
                                    setOpenFaq((current) => (current === index ? -1 : index))
                                }
                                aria-expanded={openFaq === index}
                            >
                                <span>{faq.question}</span>
                                <span className="contact-faq-symbol">
                                    {openFaq === index ? "−" : "+"}
                                </span>
                            </button>

                            {openFaq === index && (
                                <div className="contact-faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="contact-bottom-cta">
                <div>
                    <span className="contact-eyebrow">THE LUXECART EXPERIENCE</span>
                    <h2>Thank You for Shopping With Us.</h2>
                    <p>
                        We're committed to making your shopping journey simple,
                        enjoyable, and memorable.
                    </p>
                </div>

                <Link to="/shop" className="contact-cta-btn">
                    Continue Shopping <FaArrowRight />
                </Link>
            </section>
        </main>
    );
}

export default Contact;