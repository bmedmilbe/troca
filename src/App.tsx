import NewRegisterForm from "./components/NewRegisterForm";
import TransactionList from "./components/TransactionList";
import "./App.css";
import { useEffect, useRef } from "react";
function App() {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const boss = true;
  useEffect(() => {
    setTimeout(() => {
      if (chatBoxRef.current)
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, 1000);
  }, []);

  return (
    <>
      {/* <LoginForm /> */}
      <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <div
          id="transactions"
          className=" flex-grow-1 overflow-scroll overflow-x-hidden"
          ref={chatBoxRef}
          // style={{ background: "rgba(0,0,0,.3)" }}
        >
          <TransactionList />
        </div>
        {boss && <NewRegisterForm />}
      </div>
    </>
  );
}

export default App;
