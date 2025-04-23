import { useParams } from "react-router-dom";
import { useSellsByClients } from "../../hooks/ground/clients/useSellsByClients";
import React, { useEffect } from "react";
import { day, month } from "../../services/dates";
import useClientBalance from "../../hooks/ground/clients/useSellsByClientsBalance";
import SellValue from "../../components/SellValue";
import { useClient } from "../../hooks/ground/clients/useClient";
import RegisterSell from "../../components/forms/RegisterSell";

const ClientPage = () => {
  const params = useParams();
  let id = params.id || "0";
  let newId = parseInt(id);

  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useSellsByClients(newId);

  const sells = response?.pages
    .slice()
    .reverse()
    .map(({ results }) => results.slice().reverse());
  const tenTrans =
    sells?.reduce(
      (total, page) =>
        total +
        page.reduce((total2, sell) => {
          if (sell.price) {
            return total2 - (sell.price || 0);
          } else if (sell.destine) {
            return total2 - (sell.value || 0);
          } else if (sell.value) {
            return total2 + (sell.value || 0);
          }
          return total2;
        }, 0),
      0
    ) || 0;
  const { data: client } = useClient(newId);

  const { data: balance } = useClientBalance(newId);
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

  return (
    <>
      <div className="d-flex flex-column" style={{ height: "70vh" }}>
        <h1 className="text-center fs-4">Vendedor(a): {client?.name}</h1>

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
            {sells?.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.map((sell) => (
                  <div
                    className="d-flex align-items-center  border m-1  rounded bg-light"
                    style={{ width: "100%" }}
                    key={sell.date}
                  >
                    <div
                      className="p-2 d-flex flex-column text-center "
                      style={{ width: "6rem" }}
                    >
                      <span className="fw-bold fs-4">
                        {/* {sell.id} */}
                        {day(sell.date)}
                      </span>
                      <span className="text-lowercase">{month(sell.date)}</span>
                    </div>
                    <div className="p-3 flex-grow-1  fs-4 align-self-start">
                      {sell?.destine?.name ||
                        sell.product?.name ||
                        (sell.client?.name ? `Pagou` : "")}
                    </div>
                    <SellValue
                      sell={sell}
                      remain={handleSetRemain(sell.value || -sell.price)}
                      handleDelete={() => console.log("delete")}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <RegisterSell clientId={client?.id || 0} />
      </div>
    </>
  );
};

export default ClientPage;
