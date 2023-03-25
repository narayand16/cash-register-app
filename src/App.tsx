import { ChangeEvent, useState } from "react";
import DenominationsTable from "./DenominationsTable";
import "./styles.css";

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
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) < 0) {
      alert("Invalid amount");
      setShowTable(false);
      return;
    }
    if (event.target.id === "bill-amount") {
      setBillAmt(event.target.value);
    }
    if (event.target.id === "cash-given") {
      setCashGiven(event.target.value);
    }
  };
  const btnClickHandler = () => {
    if (Number(cashGiven) >= Number(billAmt)) {
      setShowTable(true);
      calculateChange(Number(cashGiven) - Number(billAmt));
    } else {
      alert("Cash amount must be equal or more than bill amount");
      setShowTable(false);
    }
  }
  return (
    <div className="App container mx-auto bg-gray-200">
      <div className="flex justify-center	flex-col items-center px-4 py-7">
        <h1 className="text-cyan-700 text-lg font-bold">Cash Register App</h1>
        <p>Enter the bill amount and cash given by the user and
          know the minimum number of notes to be returned</p>
        <div className="py-3">
          <label className="block text-md font-medium leading-6 text-gray-900 mb-2" htmlFor="bill-amount">Bill Amount</label>
          <input
            className="block w-80 border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:p-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 md:text-sm sm:leading-6"
            id="bill-amount"
            value={billAmt}
            placeholder="Bill Amount"
            onChange={inputChangeHandler}
            type="number"
          />
        </div>
        <div className="py-3">
          <label className="block text-md font-medium leading-6 text-gray-900 mb-2" htmlFor="cash-given">Cash given</label>
          <input
            className="block w-80 border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:p-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 md:text-sm sm:leading-6"
            value={cashGiven}
            type="number"
            placeholder="Cash Amount"
            id="cash-given"
            onChange={inputChangeHandler}
          />
        </div>
        <button
          className="my-3 bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          onClick={btnClickHandler}>
          Calculate
        </button>

        {showTable && <DenominationsTable noteCounts={noteCounts} />}
      </div>

    </div>
  );
}
