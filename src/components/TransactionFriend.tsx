import React from "react";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import useFriendBalance from "../hooks/useFriendPayments";
import useTransactions, { Transaction } from "../hooks/useTransactions";
import { day, month } from "../services/dates";
import TransactionValue from "./TransactionValue";
interface Props {
  boss?: number;
  friend?: number;
}
const TransactionFriend = ({ boss, friend }: Props) => {
  const query_param = {
    is_charge: undefined,
    completed_by: undefined,
    friend_paid: undefined,
    search: undefined,
    boss: boss,
    completed: undefined,
    friend: friend,
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useTransactions(query_param);
  const { data: balance } = useFriendBalance({ boss, friend });
  // const [transactions, setTransactions] = useState(data);#
  // console.log(transactions);

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
  const transactions = data?.pages
    .slice()
    .reverse()
    .map(({ results }) => results.slice().reverse());

  // console.log(balance);
  const remainFromDatabase = (balance?.enter || 0) - (balance?.out || 0);
  // const remainFromDatabase = 0;
  // console.log(remainFromDatabase);
  // somadetudo + x = balanco
  // x = balanco - somadatydo
  const tenTrans =
    transactions?.reduce(
      (total, page) =>
        total +
        page.reduce((total2, transaction) => {
          if (transaction.completed && transaction?.value) {
            return total2 - transaction?.value;
          } else if (transaction.is_charge && transaction?.value) {
            return total2 + (transaction.value || 0);
          }
          return total2;
        }, 0),
      0
    ) || 0;

  let values = {
    remain: tenTrans ? remainFromDatabase - tenTrans : remainFromDatabase,
  };
  const handleSetRemain = (value: number) => {
    values = { ...values, remain: value };

    return values.remain;
  };

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
                        : values.remain
                    )}
                  /> */}
                  {!transaction.is_charge && (transaction.value || 0) ? (
                    <TransactionValue
                      transaction={transaction}
                      handleDelete={handleDelete}
                      remain={handleSetRemain(
                        transaction.completed
                          ? handleSetRemain(
                              values.remain - (transaction.value || 0)
                            )
                          : values.remain
                      )}
                    />
                  ) : (
                    <TransactionValue
                      transaction={transaction}
                      handleDelete={handleDelete}
                      remain={handleSetRemain(
                        handleSetRemain(
                          values.remain + (transaction.value || 0)
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

export default TransactionFriend;
