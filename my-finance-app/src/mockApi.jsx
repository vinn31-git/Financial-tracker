// i'm faking an API here since we don't have a backend
// using setTimeout to make it feel like a real network request
const MOCK_DB = [
  { id: 1, date: "Apr 2, 2026", category: "Salary", type: "Income", amount: 5000 },
  { id: 2, date: "Apr 1, 2026", category: "Groceries", type: "Expense", amount: 150 },
  { id: 3, date: "Mar 30, 2026", category: "Travel", type: "Expense", amount: 450 },
  { id: 4, date: "Mar 28, 2026", category: "Electricity Bill", type: "Expense", amount: 120 },
  { id: 5, date: "Mar 24, 2026", category: "Restaurant", type: "Expense", amount: 85 },
  { id: 6, date: "Mar 22, 2026", category: "Gas Bill", type: "Expense", amount: 60 },
  { id: 7, date: "Mar 20, 2026", category: "Internet", type: "Expense", amount: 80 },
  { id: 8, date: "Mar 18, 2026", category: "Shopping", type: "Expense", amount: 200 },
  { id: 9, date: "Mar 15, 2026", category: "Bonus", type: "Income", amount: 800 },
  { id: 10, date: "Mar 14, 2026", category: "Credit", type: "Income", amount: 800 },
];
function getTransactions() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve([...MOCK_DB]);
    }, 800); // 800ms delay to simulate loading
  });
}

function addTransaction(tx) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      // giving the new transaction a unique id using current timestamp
      var newTx = { ...tx, id: Date.now() };
      resolve(newTx);
    }, 300);
  });
}

function deleteTransaction(id) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({ ok: true }); // confirming / giving green signal for deletion!!
    }, 300);

  });
}

export { getTransactions, addTransaction, deleteTransaction };
export default { getTransactions, addTransaction, deleteTransaction };
