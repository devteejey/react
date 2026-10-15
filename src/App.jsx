
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FaBars, FaSun, FaMoon, FaArrowRight, FaRocket, FaBolt, FaShieldHalved, FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function App() {
  const [count, setCount] = useState(0);
  const [navBarOpen, setNavBarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Features", id: "features" },
    { label: "About", id: "about" },
    { label: "Pricing", id: "pricing" },
    { label: "Contact", id: "contact" }
  ];

  const features = [
    {
      icon: <FaBolt />,
      title: "Fast Performance",
      description: "Built with React and Vite for lightning-fast load times and smooth interactions."
    },
    {
      icon: <FaRocket />,
      title: "Responsive Design",
      description: "Optimized for desktop, tablet, and mobile with flexible modern layouts."
    },
    {
      icon: <FaShieldHalved />,
      title: "Reusable Components",
      description: "Organized sections and reusable patterns that scale with your product."
    },
    {
      icon: <FaStar />,
      title: "Developer Friendly",
      description: "Clean structure, easy customization, and ready-to-extend starter content."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$19",
      description: "For small projects and prototypes.",
      features: ["Single project", "Basic components", "Email support"],
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      description: "For growing teams and commercial apps.",
      features: ["Unlimited projects", "Advanced UI blocks", "Priority support"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For scaling products with custom needs.",
      features: ["Custom integrations", "Dedicated onboarding", "SLA support"],
      popular: false
    }
  ];

  const faqs = [
    { question: "Is this template production ready?", answer: "Yes. It includes a modern structure, responsive layout, and clear code patterns for quick deployment." },
    { question: "Can I customize it easily?", answer: "Absolutely. The component structure and CSS are simple to edit, extend, and style for your brand." },
    { question: "Does it include a mobile menu?", answer: "Yes. The navigation includes a mobile-friendly menu toggle and responsive behavior." },
    { question: "How quickly can I launch?", answer: "Most projects can be customized and launched in a single afternoon using the built-in starter sections." }
  ];

  const trustedBy = ["Vercel", "Shopify", "Stripe", "Notion", "Figma"];

  const showToast = (message, type = "success") => {
    const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `toast-${++toastId.current}`;
    setToasts((current) => [...current, { id, message, type }]);
  };

  useEffect(() => {
    if (toasts.length === 0) return;

    const timer = window.setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [toasts]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setNavBarOpen(false);
  };

  const openModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleButtonClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    openModal("Plan selected", `You chose the ${planName} plan. We’ll contact you to get started.`);
    showToast(`${planName} plan selected`, "success");
    scrollToSection("contact");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    showToast("Your inquiry has been sent successfully.", "success");
    event.target.reset();
  };

  const handlePrimaryAction = () => {
    openModal("Let’s build together", "Tell us what you want to launch and we’ll help map the next steps.");
    showToast("Project inquiry started", "info");
    scrollToSection("contact");
  };

  return (
    <div className={`app-shell ${darkMode ? "dark" : "light"}`}>
      <nav>
        <div className="brand-wrap">
          <div className="brand-mark">RP</div>
          <h2>ReactPro</h2>
        </div>

        <ul className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setNavBarOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() => {
              setDarkMode((current) => !current);
              showToast(darkMode ? "Switched to light mode" : "Switched to dark mode", "info");
            }}
            aria-label="Toggle color mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            className="menu-button"
            onClick={() => setNavBarOpen((isOpen) => !isOpen)}
            aria-label={navBarOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={navBarOpen}
            aria-controls="mobile-navigation"
          >
            {navBarOpen ? <IoClose size={25} /> : <FaBars size={25} />}
          </button>
        </div>
      </nav>

      <ul id="mobile-navigation" className={`mobile-nav ${navBarOpen ? "open" : ""}`} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={() => setNavBarOpen(false)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <main id="home">
        <section className="hero">
          <span className="eyebrow">Launch faster. Ship smarter.</span>
          <h1>Build Modern React Applications</h1>

          <p>
            A premium starter template designed to help you create polished, scalable products with speed and confidence.
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={handlePrimaryAction}>
              Get Started <FaArrowRight />
            </button>
            <button className="secondary-button" onClick={() => handleButtonClick("features")}>
              View Demo
            </button>
          </div>

          <div className="trusted-by">
            {trustedBy.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>

          <div className="stats-row">
            <div>
              <strong>10k+</strong>
              <span>Users</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Rating</span>
            </div>
            <div>
              <strong>99.9%</strong>
              <span>Uptime</span>
            </div>
          </div>
        </section>

        <section className="counter-section">
          <h2>Interactive Counter</h2>

          <div className="counter">
            <button onClick={() => setCount((current) => current - 1)} aria-label="Decrease count">-</button>
            <span>{count}</span>
            <button onClick={() => setCount((current) => current + 1)} aria-label="Increase count">+</button>
          </div>
        </section>

        <section className="features" id="features">
          <h2>Features</h2>

          <div className="grid">
            {features.map((feature, index) => (
              <div key={index} className="card glass-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials" id="about">
          <h2>What Developers Say</h2>

          <div className="grid">
            <div className="card quote-card glass-card">
              <p>“Amazing starter template. Saved me hours and gave our team a clean foundation.”</p>
              <strong>John D.</strong>
            </div>

            <div className="card quote-card glass-card">
              <p>“Clean structure, beautiful layout, and easy to customize for production use.”</p>
              <strong>Sarah M.</strong>
            </div>

            <div className="card quote-card glass-card">
              <p>“Perfect for building polished apps quickly without reinventing the basics.”</p>
              <strong>Mike T.</strong>
            </div>
          </div>
        </section>

        <section className="pricing" id="pricing">
          <h2>Simple Pricing</h2>

          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`price-card glass-card ${plan.popular ? "popular" : ""}`}>
                {plan.popular && <span className="badge">Most Popular</span>}
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}<span>/mo</span></div>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button onClick={() => handlePlanSelect(plan.name)}>Choose Plan</button>
              </div>
            ))}
          </div>
        </section>

        <section className="faq" id="faq">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.question} className="faq-item glass-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-wrapper" id="contact">
          <div className="contact-card glass-card">
            <div className="contact-copy">
              <span className="eyebrow">Let’s talk</span>
              <h2>Start your next big idea with us.</h2>
              <p>Tell us your goals and we’ll help you turn them into a product people love.</p>
              {selectedPlan && (
                <div className="selected-plan">Selected plan: <strong>{selectedPlan}</strong></div>
              )}
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" placeholder="Your name" required />
                <input type="email" placeholder="Email address" required />
              </div>
              <input type="text" placeholder="Project type" value={selectedPlan} readOnly />
              <textarea rows="4" placeholder="Tell us about your project" required />
              <button type="submit" className="primary-button">
                Send Inquiry <FaArrowRight />
              </button>
              {formSubmitted && <p className="success-message">Thanks! Your request has been submitted successfully.</p>}
            </form>
          </div>
        </section>

        <section className="cta">
          <h2>Ready to build something amazing?</h2>
          <button className="primary-button" onClick={handlePrimaryAction}>
            Start Your Project <FaArrowRight />
          </button>
        </section>
      </main>

      <div className={`modal-overlay ${isModalOpen ? "visible" : ""}`} onClick={() => setIsModalOpen(false)}>
        <div className="modal-card glass-card" onClick={(event) => event.stopPropagation()}>
          <button className="close-button" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
            ×
          </button>
          <h3>{modalTitle}</h3>
          <p>{modalMessage}</p>
          <button className="primary-button" onClick={() => {
            setIsModalOpen(false);
            scrollToSection("contact");
          }}>
            Continue <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <footer>
        <p>© 2026 ReactPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
