import useDeleteTransaction from "../hooks/useDeleteTransaction";
import useRemain from "../hooks/useRemain";
import useTransactions, { Transaction } from "../hooks/useTransactions";
import { day, month } from "../services/dates";
import TransactionValue from "./TransactionValue";
interface Props {
  boss?: number;
  deliver?: number;
}
const TransactionDeliver = ({ boss, deliver }: Props) => {
  const deleteTransaction = useDeleteTransaction();
  const handleDelete = (transaction?: Transaction) => {
    if (!transaction) return;
    if (!transaction.completed) {
      if (confirm("Tem certeza que quer apagar?")) {
        deleteTransaction.mutate(transaction);
      }
    } else {
      alert("Informe ao gestor.");
    }
  };

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

  const allTransactions = data?.pages.flatMap((page) => page.results) || [];

  const { data: balance } = useRemain({ boss: boss, deliver: deliver });

  const remainFromDatabase = (balance?.enter || 0) - (balance?.out || 0);
  let currentBalance = remainFromDatabase;
  console.log(remainFromDatabase);
  const transactionsWithBalance = allTransactions
    .map((t) => {
      const balanceAtThisPoint = currentBalance;

      if (t.completed) currentBalance += t.value || 0;
      else if (t.is_charge) currentBalance -= t.value || 0;

      return { ...t, computedRemain: balanceAtThisPoint };
    })
    .reverse();

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
        {transactionsWithBalance?.map((transaction) => (
          <div
            className="d-flex align-items-center border m-1 rounded bg-light"
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
                remain={transaction.computedRemain}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionDeliver;
