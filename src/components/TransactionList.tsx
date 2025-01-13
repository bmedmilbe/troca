import { useState } from "react";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import useTransactions, { Transaction } from "../hooks/useTransactions";
import { day, month } from "../services/dates";
import TransactionValue from "./TransactionValue";

const TransactionList = () => {
  let values = { valuesIGot: 300 };
  const { data: transactions } = useTransactions();
  // const [transactions, setTransactions] = useState(data);#
  // console.log(transactions);

  const deleteTransaction = useDeleteTransaction();

  const handleSetValuesIGot = (value: number) => {
    values = { ...values, valuesIGot: value };

    return values.valuesIGot;
  };
  const handleDelete = (transaction: Transaction) => {
    // console.log(transaction);
    if (!transaction.completed) {
      if (confirm("Tem certeza que quer apagar?")) {
        deleteTransaction.mutate(transaction);
        // setTransactions([transactions?.filter((t) => t.id != transaction.id)]);
      }
    } else {
      alert("Informe ao gestor.");
    }
  };
  return (
    <div>
      {transactions
        ?.sort((a, b) => b.id - a.id)
        .reverse()
        ?.map((transaction) => (
          <div
            className="d-flex align-items-center  border m-1  rounded bg-light"
            style={{ width: "100%" }}
            key={transaction.id}
          >
            <div
              className="p-2 d-flex flex-column text-center "
              style={{ width: "6rem" }}
            >
              <span className="fw-bold fs-4">{day(transaction.date)}</span>
              <span className="text-lowercase">{month(transaction.date)}</span>
            </div>
            <div className="p-2 flex-grow-1 align-self-start">
              {transaction.description}
            </div>
            <div
              className="p-2 d-flex flex-column text-center "
              style={{ width: "11rem" }}
            >
              <TransactionValue
                transaction={transaction}
                handleDelete={handleDelete}
                remain={handleSetValuesIGot(
                  transaction.completed
                    ? handleSetValuesIGot(values.valuesIGot - transaction.value)
                    : values.valuesIGot
                )}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TransactionList;
