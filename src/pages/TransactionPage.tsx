import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransactionDeliver from "../components/TransactionDeliver";
import useCustomer from "../hooks/useCustomer";
import { Customer } from "../hooks/useCustomers";
import useMe from "../hooks/useMe";
import NewRegisterForm from "./../components/NewRegisterForm";
const TransactionPage = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const nav = useNavigate();
  let id = params.id || "0";
  let newId = parseInt(id);

  const { data: deliver, isLoading } = useCustomer<Customer>(newId);

  const { data: me } = useMe<Customer>();
  // const [boss, setBoss] = useState(newId);

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

  return (
    <>
      {/* <LoginForm /> */}

      <div className="d-flex flex-column" style={{ height: "80vh" }}>
        <div className="d-flex">
          <button
            type="button"
            onClick={() => nav("/")}
            className="btn btn-primary m-1"
          >
            {"< voltar"}
          </button>
          <div className="flex-grow-1">
            <h1 className="text-center">
              {deliver?.first_name} {deliver?.last_name}
            </h1>
          </div>
        </div>
        <div
          id="transactions"
          className="flex-grow-1 overflow-scroll overflow-x-hidden"
          ref={chatBoxRef}
        >
          {/* <TransactionBoss deliver={deliver} me={me} /> */}
          {/* {me && me.boss && <TransactionBoss boss={me.id} deliver={newId} />} */}
          {/* {console.log({ boss: newId, deliver: deliver?.boss })} */}
          {/* {!isLoading && me && !me.boss && (
            <TransactionDeliver boss={newId} deliver={me.id} />
          )} */}
          {!isLoading && me && (
            <TransactionDeliver boss={me.id} deliver={newId} />
          )}
        </div>
        {me?.boss && <NewRegisterForm deliver={newId} />}
      </div>
    </>
  );
};

export default TransactionPage;
