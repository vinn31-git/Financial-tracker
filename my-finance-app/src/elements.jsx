// ── About Page ─────────────────────────────────────────────────
import { useState } from "react";
function AboutPage() {
  return (
    <main className="main">
      <h1 className="page-title">About Us</h1>
      <div className="info-card">
        <div className="info-card-icon">💜</div>
        <h2 className="info-card-heading">What is FinanceHub?</h2>
        <p className="info-card-text">
          SmartSpend is a simple personal finance dashboard built to help you
          keep track of your income, expenses and savings all in one place.
          No complicated setup, no bank connections — just you and your numbers.
        </p>
      </div>

      <div className="info-grid">
        <div className="info-box">
          <span className="info-box-icon">🎯</span>
          <h3>Our Goal</h3>
          <p>Make budgeting easy and stress-free for everyone, not just finance experts.</p>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🔒</span>
          <h3>Privacy First</h3>
          <p>All your data stays on your device. We don't store or share anything with third parties.</p>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🚀</span>
          <h3>Always Improving</h3>
          <p>We're constantly adding new features based on user feedback. More coming soon!</p>
        </div>
      </div>
    </main>
  );
}

// ── Services Page ───────────────────────────────────────────────
function ServicesPage() {
  var services = [
    {
      icon: "📊",
      name: "Expense Tracking",
      desc: "Log and categorize every transaction. See exactly where your money is going each month.",
      tag: "Free",
    },
    {
      icon: "📈",
      name: "Spending Analytics",
      desc: "Visual charts that break down your spending by category so you can spot patterns easily.",
      tag: "Free",
    },
    {
      icon: "🎯",
      name: "Budget Planning",
      desc: "Set monthly budgets for each category and get notified when you're close to the limit.",
      tag: "Coming Soon",
    },
    {
      icon: "📤",
      name: "Export Reports",
      desc: "Download your transaction history as CSV or PDF to share with your accountant.",
      tag: "Coming Soon",
    },
    {
      icon: "🔑",
      name: "Admin Controls",
      desc: "Switch to admin mode to add, edit or delete transactions directly from the dashboard.",
      tag: "Free",
    },
    {
      icon: "🌙",
      name: "Dark Mode",
      desc: "Easy on the eyes — toggle between light and dark theme anytime from the navbar.",
      tag: "Free",
    },
  ];

  return (
    <main className="main">
      <h1 className="page-title">Our Services</h1>
      <p className="page-subtitle">Everything you need to manage your finances in one place.</p>

      <div className="services-grid">
        {services.map(function(s, i) {
          return (
            <div key={i} className="service-card">
              <div className="service-top">
                <span className="service-icon">{s.icon}</span>
                <span className={s.tag === "Free" ? "service-tag free" : "service-tag soon"}>
                  {s.tag}
                </span>
              </div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

// ── Contact Page ────────────────────────────────────────────────
function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (name === "" || email === "" || message === "") {
      alert("Please fill in all the fields!");
      return;
    }
    // in a real app this would call an API
    // for now just show a success message
    setSent(true);
  }

  return (
    <main className="main">
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-wrap">

        {/* left side - contact info */}
        <div className="contact-info">
          <h2 className="info-card-heading">Get in Touch</h2>
          <p className="info-card-text">
            Have a question or found a bug? We'd love to hear from you.
            Fill in the form and we'll get back to you as soon as possible.
          </p>

          <div className="contact-details">
            <div className="contact-detail-row">
              <span>📧</span>
              <span>hello@SmartSpend.app</span>
            </div>
            <div className="contact-detail-row">
              <span>📍</span>
              <span> India</span>
            </div>
            <div className="contact-detail-row">
              <span>🕐</span>
              <span>Mon – Fri, 9am to 6pm IST</span>
            </div>
          </div>
        </div>

        {/* right side - contact form */}
        <div className="contact-form-box">
          {sent ? (
            <div className="form-success">
              <span style={{ fontSize: "40px" }}>✅</span>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We'll reply within 24 hours.</p>
              <button className="btn-save" onClick={() => setSent(false)}>
                Send Another
              </button>
            </div>
          ) : (
            <>
              <div className="modal-field">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Message</label>
                <textarea
                  className="contact-textarea"
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <button className="btn-save" style={{ width: "100%" }} onClick={handleSend}>
                Send Message
              </button>
            </>
          )}
        </div>

      </div>
    </main>
  );
}
export { AboutPage, ServicesPage, ContactPage };
export default { AboutPage, ServicesPage, ContactPage };
