import React, { useState } from "react";
import AddTransactionModal from "./admin.jsx";

// this component shows the list of transactions
// also handles search, filter and sorting
function TransactionsTable({ transactions, role, loading, onAdd, onDelete }) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [showModal, setShowModal] = useState(false);

  // filter and sort the transactions based on user input
  function getFilteredList() {
    var result = transactions.filter(function(item) {
      var matchesSearch =
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.date.toLowerCase().includes(search.toLowerCase());

      var matchesFilter = filter === "All" || item.type === filter;

      return matchesSearch && matchesFilter;
    });

    // sort based on what the user picked
    if (sortBy === "amount") {
      result.sort(function(a, b) {
        return b.amount - a.amount;
      });
    } else if (sortBy === "category") {
      result.sort(function(a, b) {
        return a.category.localeCompare(b.category);
      });
    } else {
      // default sort by newest first
      result.sort(function(a, b) {
        return b.id - a.id;
      });
    }

    return result;
  }

  var filteredTransactions = getFilteredList();

  return (
    <>
      <div className="table-card">

        <div className="table-header-row">
          <h3 className="chart-title" style={{ marginBottom: 0 }}>
            Recent Transactions
          </h3>

          {/* only admin can add transactions */}
          {role === "Admin" && (
            <button className="add-tx-btn" onClick={() => setShowModal(true)}>
              + Add
            </button>
          )}
        </div>

        {/* search bar and filters */}
        <div className="table-controls">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
            <option value="category">Sort: Category</option>
          </select>
        </div>

        <table className="tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th className="amount-col">Amount</th>
              {role === "Admin" && <th></th>}
            </tr>
          </thead>

          <tbody>

            {/* show skeleton rows while data is loading */}
            {loading && (
              <>
                <tr className="tx-row">
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  {role === "Admin" && <td />}
                </tr>
                <tr className="tx-row">
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  {role === "Admin" && <td />}
                </tr>
                <tr className="tx-row">
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  <td><div className="skeleton-cell" /></td>
                  {role === "Admin" && <td />}
                </tr>
              </>
            )}

            {/* show message if nothing matches the search */}
            {!loading && filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={role === "Admin" ? 5 : 4} className="empty-cell">
                  No transactions found.
                </td>
              </tr>
            )}

            {/* show the actual transactions */}
            {!loading && filteredTransactions.map(function(item) {
              return (
                <tr key={item.id} className="tx-row">
                  <td className="tx-date">{item.date}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={item.type === "Income" ? "badge badge-income" : "badge badge-expense"}>
                      {item.type}
                    </span>
                  </td>
                  <td className={item.type === "Income" ? "amount-col pos" : "amount-col neg"}>
                    {item.type === "Income"
                      ? "+$" + item.amount.toLocaleString()
                      : "-$" + item.amount.toLocaleString()}
                  </td>

                  {/* admin can delete any transaction */}
                  {role === "Admin" && (
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(item.id)}
                      >
                        ✕
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>

      {/* show the add modal when button is clicked */}
      {showModal && (
        <AddTransactionModal
          onAdd={onAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}


// shows 3 insight cards at the bottom of the page
function Insights({ transactions }) {

  // separate income and expenses into two lists
  var expenseList = transactions.filter(function(t) {
    return t.type === "Expense";
  });

  var incomeList = transactions.filter(function(t) {
    return t.type === "Income";
  });

  // find which category has the most spending
  var categoryTotals = {};
  for (var i = 0; i < expenseList.length; i++) {
    var cat = expenseList[i].category;
    var amt = expenseList[i].amount;
    if (categoryTotals[cat]) {
      categoryTotals[cat] = categoryTotals[cat] + amt;
    } else {
      categoryTotals[cat] = amt;
    }
  }

  var topCategory = null;
  var entries = Object.entries(categoryTotals);
  if (entries.length > 0) {
    entries.sort(function(a, b) { return b[1] - a[1]; });
    topCategory = entries[0];
  }

  // calculate total income and expenses
  var totalIncome = 0;
  for (var j = 0; j < incomeList.length; j++) {
    totalIncome = totalIncome + incomeList[j].amount;
  }

  var totalExpenses = 0;
  for (var k = 0; k < expenseList.length; k++) {
    totalExpenses = totalExpenses + expenseList[k].amount;
  }

  var savedAmount = totalIncome - totalExpenses;

  var savingsRate = "0";
  if (totalIncome > 0) {
    savingsRate = ((savedAmount / totalIncome) * 100).toFixed(0);
  }

  // most recent income entry
  var lastIncome = incomeList[0];

  return (
    <div className="insights-section">
      <h3 className="section-title">Insights</h3>

      <div className="insights-grid">

        {/* highest spending category */}
        <div className="insight-card">
          <span className="insight-icon">🛒</span>
          <div>
            <p className="insight-label">Highest Spending</p>
            <p className="insight-main">
              {topCategory ? topCategory[0] : "–"}
            </p>
            <p className="insight-sub">
              {topCategory
                ? "$" + topCategory[1].toLocaleString() + " spent"
                : "No expenses yet"}
            </p>
          </div>
        </div>

        {/* savings rate */}
        <div className="insight-card">
          <span className="insight-icon">📈</span>
          <div>
            <p className="insight-label">Savings Rate</p>
            <p className="insight-main">{savingsRate}%</p>
            <p className="insight-sub">
              ${savedAmount.toLocaleString()} saved this period
            </p>
          </div>
        </div>

        {/* last income received */}
        <div className="insight-card">
          <span className="insight-icon">📅</span>
          <div>
            <p className="insight-label">Last Income</p>
            <p className="insight-main">
              {lastIncome ? "$" + lastIncome.amount.toLocaleString() : "–"}
            </p>
            <p className="insight-sub">
              {lastIncome
                ? lastIncome.category + " on " + lastIncome.date
                : "No income recorded"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}


export { TransactionsTable, Insights };
