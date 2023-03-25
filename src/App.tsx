import { useState } from "react";
import "./styles.css";
import "./tailwind.css";

export default function App() {
  const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  const emptyObj: { [k: string]: number } = {};
  const [billAmt, setBillAmt] = useState("");
  const [cashGiven, setCashGiven] = useState("");
  const [noteCounts, setNoteCounts] = useState(emptyObj);
  const [showTable, setShowTable] = useState(false);

  const calculateChange = (amountToReturn: number) => {
    const newNoteCounts: { [k: string]: number } = {};
    denominations.forEach((denomination) => {
      let noOfNotes = Math.trunc(amountToReturn / denomination);
      amountToReturn = amountToReturn % denomination;
      newNoteCounts[denomination] = noOfNotes;
    });
    setNoteCounts(newNoteCounts);
  };
  const inputChangeHandler = (event) => {
    console.log(
      "event.target.value",
      event.target.value,
      Number(event.target.value),
      event.target.value === Number(event.target.value),
      showTable
    );
    let inputCash = 0;
    let inputBill = 0;
    if (event.target.value < 0) {
      alert("Invalid amount");
      setShowTable(false);
      return;
    }
    if (event.target.id === "bill-amount") {
      setBillAmt(event.target.value);
      inputBill = Number(event.target.value);
    }
    if (event.target.id === "cash-given") {
      setCashGiven(event.target.value);
      inputCash = Number(event.target.value);
    }
    if (inputCash >= inputBill) {
      console.log("here", cashGiven, billAmt);
      setShowTable(true);
      calculateChange(inputCash - inputBill);
    } else {
      // alert("cash should be equal or more than bill amount");
      setShowTable(false);
    }
  };
  return (
    <div className="App">
      <h1>Cash Register</h1>
      <label htmlFor="bill-amount">Bill Amount</label>
      <input
        className="block w-full rounded-md border-0"
        id="bill-amount"
        value={billAmt}
        onChange={inputChangeHandler}
        type="number"
      />
      <label htmlFor="cash-given">Cash given</label>
      <input
        value={cashGiven}
        type="number"
        id="cash-given"
        onChange={inputChangeHandler}
      />

      {showTable && (
        <table className="table-auto">
          <thead>
            <tr>
              <th>Denominations</th>
              {denominations.map((item, index) => {
                return <td key={index}>{noteCounts[item] > 0 && item}</td>;
              })}
            </tr>
            <tr>
              <th>No. of notes</th>
              {denominations.map((item, index) => {
                return (
                  <td key={index}>
                    {noteCounts[item] > 0 && noteCounts[item]}
                  </td>
                );
              })}
            </tr>
          </thead>
        </table>
      )}
    </div>
  );
}
