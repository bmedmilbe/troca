import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { day, month } from "../../services/dates";
import SellValue from "../../components/SellValue";
import { useExpensesByDestine } from "../../hooks/ground/clients/useExpensesByDestine";
import { useDestine } from "../../hooks/ground/destine/useDestine";
import useDestineBalance from "../../hooks/ground/destine/useDestineBalance";
import RegisterExpense from "../../components/forms/RegisterExpense";

const ExpensePage = () => {
  const params = useParams();
  let id = params.id || "0";
  let newId = parseInt(id);

  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useExpensesByDestine(newId);

  const expenses = response?.pages
    .slice()
    .reverse()
    .map(({ results }) => results.slice().reverse());
  const tenTrans =
    expenses?.reduce(
      (total, page) =>
        total +
        page.reduce((total2, sell) => {
          if (sell.destine) {
            return total2 - (sell.value || 0);
          } else if (sell.value) {
            return total2 + (sell.value || 0);
          }
          return total2;
        }, 0),
      0
    ) || 0;
  const { data: destine } = useDestine(newId);

  const { data: balance } = useDestineBalance(newId);
  const remailFromDB = (balance?.enter || 0) - (balance?.out || 0);
  let remain = tenTrans ? remailFromDB - tenTrans : remailFromDB;

  console.log(remain);
  const handleSetRemain = (value: number) => {
    // let currentRemain = remain + 0;
    remain = remain + value;
    return remain;
  };

  useEffect(() => {
    let chatBoxRef = document.getElementById("opslist");
    setTimeout(() => {
      if (chatBoxRef) {
        chatBoxRef.scrollTop = chatBoxRef.scrollHeight;
      }
    }, 1000);
  }, [remailFromDB]);
  // console.log(expenses);
  return (
    <>
      <div className="d-flex flex-column" style={{ height: "70vh" }}>
        <h1 className="text-center fs-4"> {destine?.name}</h1>

        <div
          className="flex-grow-1 overflow-scroll overflow-x-hidden"
          id="opslist"
        >
          <button
            className="btn btn-warning w-100"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || !hasNextPage}
          >
            {isFetchingNextPage ? "Carregando..." : "Ver mais"}
          </button>

          <div>
            {expenses?.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.map((expense) => (
                  <div
                    className="d-flex align-items-center  border m-1  rounded bg-light"
                    style={{ width: "100%" }}
                    key={expense.date}
                  >
                    <div
                      className="p-2 d-flex flex-column text-center "
                      style={{ width: "6rem" }}
                    >
                      <span className="fw-bold fs-4">
                        {/* {sell.id} */}
                        {day(expense.date)}
                      </span>
                      <span className="text-lowercase">
                        {month(expense.date)}
                      </span>
                    </div>
                    <div className="p-3 flex-grow-1  fs-4 align-self-start">
                      {expense.destine?.name ? "Saída" : "Reembolso"}
                    </div>
                    <SellValue
                      sell={expense}
                      remain={handleSetRemain(
                        expense.from_destine ? expense.value : -expense.value
                      )}
                      handleDelete={() => console.log("delete")}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <RegisterExpense destineId={destine?.id || 0} />
      </div>
    </>
  );
};

export default ExpensePage;
