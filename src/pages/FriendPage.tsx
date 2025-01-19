import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewPaymentForm from "../components/NewPaymentForm";
import TransactionFriend from "../components/TransactionFriend";
import { Customer } from "../hooks/useCustomers";
import useFriend from "../hooks/useFriend";
import { Friend } from "../hooks/useFriends";
import useMe from "../hooks/useMe";
import { day, month } from "../services/dates";
const FriendPage = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const nav = useNavigate();
  let id = params.id || "0";
  let newId = parseInt(id);

  const { data: friend, isLoading } = useFriend<Friend>(newId);

  const { data: me } = useMe<Customer>();
  // const [boss, setBoss] = useState(newId);
  // console.log(friend);
  // useEffect(() => {
  //   setBoss(deliver);
  //   console.log(newId);
  // }, [params]);

  // console.log(deliver);
  // console.log(me);
  // const boss = true;
  useEffect(() => {
    setTimeout(() => {
      if (chatBoxRef.current)
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, 1000);
  }, []);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {/* <LoginForm /> */}

      <div className="d-flex flex-column" style={{ height: "80vh" }}>
        <div className="d-flex">
          <button
            type="button"
            onClick={() => nav("/friends")}
            className="btn btn-primary m-1"
          >
            {"< voltar"}
          </button>
          <div className="flex-grow-1">
            <h1 className="text-center">{friend?.name}</h1>
          </div>
          <button
            onClick={() => setModalShow(true)}
            className="btn btn-primary m-1"
          >
            {"pagamentos >"}
          </button>
        </div>

        <div
          id="transactions"
          className="flex-grow-1 overflow-scroll overflow-x-hidden"
          ref={chatBoxRef}
        >
          {!isLoading && me && friend && (
            <TransactionFriend boss={me?.id} friend={friend.id} />
          )}
        </div>
        {me?.boss && <NewPaymentForm friend={newId} />}
      </div>
      <div
        className={`modal fade ${modalShow ? "show" : ""}`}
        id="payment#modal"
        aria-labelledby="Payments"
        aria-modal="true"
        style={{ display: ` ${modalShow ? "block" : "none"}` }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="Payments">
                Pagamentos de {friend?.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalShow(false)}
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ maxHeight: "50vh", overflowY: "auto" }}
            >
              {friend?.payments?.map((payment, index) => (
                <React.Fragment key={index}>
                  <div
                    className="d-flex align-items-center  border m-1  rounded bg-light"
                    style={{ width: "100%" }}
                    key={payment.id}
                  >
                    <div
                      className="p-2 d-flex flex-column text-center "
                      style={{ width: "6rem" }}
                    >
                      <span className="fw-bold fs-4">
                        {/* {payment.id} */}
                        {day(payment?.date || "")}
                      </span>
                      <span className="text-lowercase">
                        {month(payment?.date || "")}
                      </span>
                    </div>
                    <div className="p-2 flex-grow-1 align-self-start">
                      {payment.description}
                    </div>
                    <div
                      className="p-2 d-flex flex-column text-center "
                      style={{ width: "11rem" }}
                    >
                      {/* <TransactionValue
                    transaction={transaction}
                    handleDelete={handleDelete}
                    remain={handleSetRemain(
                      payment.completed
                        ? handleSetRemain(values.remain - payment.value)
                        : values.remain
                    )}
                  /> */}
                      <span className={`fw-bold fs-4 text-success`}>
                        {payment.value},00
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setModalShow(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendPage;
