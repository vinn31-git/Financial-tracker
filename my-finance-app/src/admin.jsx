import  { useState } from "react";

// this popup shows up when admin wants to add a new transaction
function AddTransactionModal({ onAdd, onClose }) {

  // keeping track of what the user types in the form
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");

  // when add button is clicked
  function handleSubmit() {

    // basic validation - make sure fields aren't empty
    if (date === "" || category === "" || amount === "") {
      alert("Please fill in all the fields!");
      return;
    }

    // create the new transaction object and send it up to parent
    var newTransaction = {
      date: date,
      category: category,
      type: type,
      amount: parseFloat(amount),
    };

    onAdd(newTransaction);
    onClose(); // close the modal after adding
  }

  // close modal if user clicks the dark background outside
  function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleBackgroundClick}>
      <div className="modal-box">

        <h3 className="modal-title">Add Transaction</h3>

        {/* date input */}
        <div className="modal-field">
          <label>Date</label>
          <input
            type="text"
            placeholder="e.g. Apr 5, 2026"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* category input */}
        <div className="modal-field">
          <label>Category</label>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* type and amount side by side */}
        <div className="modal-row">

          <div className="modal-field">
            <label>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div className="modal-field">
            <label>Amount ($)</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

        </div>

        {/* cancel just closes, save calls handleSubmit */}
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            Add
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddTransactionModal;