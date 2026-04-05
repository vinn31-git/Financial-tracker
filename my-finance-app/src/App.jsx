import { useEffect, useState } from "react";
import { StatCard, LineChart, PieChart } from "./cards.jsx";
import { getTransactions, addTransaction, deleteTransaction } from "./mockApi.jsx";
import { TransactionsTable, Insights } from "./table.jsx";
import { AboutPage, ServicesPage, ContactPage } from "./elements.jsx";
import "./styles.css";

export default function FinanceHub() {
  const [dark, setDark] = useState(false);
  const [role, setRole] = useState("Viewer");
  const [page, setPage] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState("loading");

  let totalIncome = 0;
  let totalExpenses = 0;

  for (let i = 0; i < transactions.length; i += 1) {
    if (transactions[i].type === "Income") {
      totalIncome += transactions[i].amount;
    } else {
      totalExpenses += transactions[i].amount;
    }
  }

  const totalBalance = totalIncome - totalExpenses;

  useEffect(() => {
    setLoading(true);
    setApiStatus("loading");

    getTransactions()
      .then((data) => {
        setTransactions(data);
        setApiStatus("ok");
      })
      .catch(() => {
        setApiStatus("error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = dark ? "#0f0e17" : "#f0f2f5";
    document.body.style.color = dark ? "#f1f0fb" : "#111827";
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  function handleAdd(tx) {
    addTransaction(tx).then((newTx) => {
      setTransactions((prev) => [newTx, ...prev]);
    });
  }

  function handleDelete(id) {
    deleteTransaction(id).then(() => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    });
  }

  function renderPage() {
    if (page === "about") {
      return <AboutPage />;
    }

    if (page === "services") {
      return <ServicesPage />;
    }

    if (page === "contact") {
      return <ContactPage />;
    }

    return (
      <main className="main">
        <h1 className="page-title">Dashboard Overview</h1>

        <div className="stats-row">
          <StatCard
            label="Total Balance"
            value={loading ? "..." : "$" + totalBalance.toLocaleString()}
            change="+12% from last month"
            positive={true}
            icon="$"
          />
          <StatCard
            label="Income"
            value={loading ? "..." : "$" + totalIncome.toLocaleString()}
            change="+8% from last month"
            positive={true}
            icon="+"
          />
          <StatCard
            label="Expenses"
            value={loading ? "..." : "$" + totalExpenses.toLocaleString()}
            change="-3% from last month"
            positive={false}
            icon="-"
          />
        </div>

        <div className="charts-row">
          <LineChart />
          <PieChart />
        </div>

        <TransactionsTable
          transactions={transactions}
          role={role}
          loading={loading}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />

        <Insights transactions={transactions} />
      </main>
    );
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">F</div>
          FinanceHub
        </div>

        <div className="nav-links">
          <button className={page === "dashboard" ? "nav-link active" : "nav-link"} onClick={() => setPage("dashboard")}>
            Dashboard
          </button>
          <button className={page === "about" ? "nav-link active" : "nav-link"} onClick={() => setPage("about")}>
            About
          </button>
          <button className={page === "services" ? "nav-link active" : "nav-link"} onClick={() => setPage("services")}>
            Services
          </button>
          <button className={page === "contact" ? "nav-link active" : "nav-link"} onClick={() => setPage("contact")}>
            Contact
          </button>
        </div>

        <div className="nav-right">
          <span className={"api-dot " + apiStatus} title={"API: " + apiStatus} />

          <select
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Viewer">Viewer</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            className="theme-btn"
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <div className="avatar">JD</div>
        </div>
      </nav>

      {role === "Admin" && (
        <div className="role-banner">
          Admin mode - you can add and delete transactions
        </div>
      )}

      {renderPage()}
    </div>
  );
}
