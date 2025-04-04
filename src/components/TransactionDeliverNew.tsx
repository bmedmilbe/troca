import React, { useEffect, useState } from "react";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import useRemain from "../hooks/useRemain";
import useTransactions, { Transaction } from "../hooks/useTransactions";
import { day, month } from "../services/dates";
import TransactionValue from "./TransactionValue";
interface Props {
  boss?: number;
  deliver?: number;
}
interface Remain {
  remain: number;
}
const TransactionDeliverNew = ({ boss, deliver }: Props) => {
  const query_param = {
    boss: boss,
    is_charge: undefined,
    completed: undefined,
    completed_by: deliver,
    friend: undefined,
    friend_paid: undefined,
    search: undefined,
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useTransactions(query_param);
  const { data: balance } = useRemain({ boss: boss, deliver: deliver });
  // const [transactions, setTransactions] = useState(data);#
  // console.log(transactions);
  // console.log(data);

  const deleteTransaction = useDeleteTransaction();

  const handleDelete = (transaction?: Transaction) => {
    if (!transaction) return;
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
  const [transactions, seTransactions] = useState<Transaction[][]>();

  // console.log(balance);
  const [remainFromDatabase, setRemainFromDatabase] = useState<number>();
  // const remainFromDatabase = 0;
  // console.log(remainFromDatabase);
  // somadetudo + x = balanco
  // x = balanco - somadatydo
  const [tenTrans, seTenTrans] = useState<number>();

  const [values, setValues] = useState<Remain>();
  const handleSetRemain = (value: number) => {
    setValues({ remain: value });

    return values?.remain || 0;
  };
  useEffect(() => {
    let tempTr = data?.pages
      .slice()
      .reverse()
      .map(({ results }) => results.slice().reverse());
    seTransactions(tempTr || []);
    let tempRemailFromDatanase = (balance?.enter || 0) - (balance?.out || 0);
    setRemainFromDatabase(tempRemailFromDatanase);
    let tempTenTrans =
      tempTr?.reduce(
        (total, page) =>
          total +
          page.reduce((total2, transaction) => {
            if (transaction.completed) {
              return total2 - (transaction.value || 0);
            } else if (transaction.is_charge) {
              return total2 + (transaction.value || 0);
            }
            return total2;
          }, 0),
        0
      ) || 0;
    seTenTrans(tempTenTrans);
    setValues({
      remain: tempTenTrans
        ? tempRemailFromDatanase - tempTenTrans
        : tempRemailFromDatanase,
    });
  }, []);

  // console.log(tenTrans);

  // console.log(transactions?.pages.reverse());

  return (
    <>
      <button
        className="btn btn-warning w-100"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
      >
        {isFetchingNextPage ? "Carregando..." : "Ver mais"}
      </button>

      <div>
        {transactions?.map((page, index) => (
          <React.Fragment key={index}>
            {page?.map((transaction) => (
              <div
                className="d-flex align-items-center  border m-1  rounded bg-light"
                style={{ width: "100%" }}
                key={transaction.id}
              >
                <div
                  className="p-2 d-flex flex-column text-center "
                  style={{ width: "6rem" }}
                >
                  <span className="fw-bold fs-4">
                    {/* {transaction.id} */}
                    {day(transaction.date)}
                  </span>
                  <span className="text-lowercase">
                    {month(transaction.date)}
                  </span>
                </div>
                <div className="p-2 flex-grow-1 align-self-start">
                  {transaction.description}
                </div>
                <div
                  className="p-2 d-flex flex-column text-center "
                  style={{ width: "11rem" }}
                >
                  {/* <TransactionValue
                    transaction={transaction}
                    handleDelete={handleDelete}
                    remain={handleSetRemain(
                      transaction.completed
                        ? handleSetRemain(values.remain - (transaction.value || 0))
                        : values?.remain || 0
                    )}
                  /> */}
                  {!transaction.is_charge ? (
                    <TransactionValue
                      transaction={transaction}
                      handleDelete={handleDelete}
                      remain={handleSetRemain(
                        transaction.completed
                          ? handleSetRemain(
                              values?.remain || 0 - (transaction.value || 0)
                            )
                          : values?.remain || 0
                      )}
                    />
                  ) : (
                    <TransactionValue
                      transaction={transaction}
                      handleDelete={handleDelete}
                      remain={handleSetRemain(
                        handleSetRemain(
                          values?.remain || 0 + (transaction.value || 0)
                        )
                      )}
                    />
                  )}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default TransactionDeliverNew;
