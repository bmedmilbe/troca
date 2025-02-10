import { useEffect, useState } from "react";
import { Transaction } from "../hooks/useTransactions";
import useCompleteTransaction from "../hooks/useCompleteTransaction";

interface Props {
  transaction: Transaction;
  remain: number;
  handleDelete: (transaction: Transaction) => void;
}
const TransactionValue = ({ transaction, remain, handleDelete }: Props) => {
  const updateTransaction = useCompleteTransaction();

  const [value, setValue] = useState(transaction.value);
  const [currentTransaction, setCurrentTransaction] = useState(transaction);
  const [completed, setCompleted] = useState(transaction.completed);

  //   const remain = valuesIGot + 0;
  const [buttonsOpen, setButtonsOpen] = useState(false);
  const handleComplete = (transaction: Transaction) => {
    // console.log(transaction);
    if (!transaction.completed) {
      if (confirm("Tem certeza que quer concluir?")) {
        updateTransaction.mutate(transaction);
        if (updateTransaction.data?.completed) {
          setCurrentTransaction({ ...updateTransaction.data });
        }
        setColor(handleColor({ ...transaction, completed: true }));
        setCompleted(true);
        setButtonsOpen(false);
      }
    } else {
      alert("Informe ao gestor.");
    }
  };

  useEffect(() => {
    setValue(currentTransaction.value);
    setColor(handleColor(currentTransaction));
    if (completed) {
      //should check who completed the transaction
      //   setValuesIGot(valuesIGot - transaction.value);
      //   setRemain(valuesIGot);
    }
  }, []);

  const [color, setColor] = useState("");

  const handleColor = (tr: Transaction) => {
    if (tr.is_charge) return "text-success";
    else if (tr.completed) return "text-secondary";
    return "text-warning";
  };

  const formatNumberWithCommas = (number: number) => {
    if (typeof number !== "number") {
      return "Invalid input. Please provide a number.";
    }

    if (number < 1000) {
      return number.toString(); // No commas needed for numbers less than 1000
    }

    return number.toLocaleString(); // Use toLocaleString() for easy comma formatting
  };

  return (
    <>
      <span
        className={`fw-bold fs-4 ${color}`}
        onClick={() => setButtonsOpen(!buttonsOpen)}
      >
        {completed ? "-" : ""}
        {formatNumberWithCommas(value || 0)}
      </span>
      <span
        className="badge text-success text-lowercase"
        id={`hf${currentTransaction.id}`}
      >
        {formatNumberWithCommas(remain)}
      </span>
      {buttonsOpen && (
        <div className="d-flex justify-content-center border">
          {!transaction.is_charge && !transaction.completed && (
            <button
              onClick={() => handleComplete(currentTransaction)}
              className="m-1 btn btn-success btn-sm"
            >
              {updateTransaction.isLoading ? "Conluindo..." : "Concluído"}
            </button>
          )}
          <button
            onClick={() => handleDelete(currentTransaction)}
            className="m-1 btn btn-danger btn-sm"
          >
            Apagar
          </button>
        </div>
      )}
    </>
  );
};

export default TransactionValue;
