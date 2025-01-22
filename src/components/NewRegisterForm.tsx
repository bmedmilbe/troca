import React, { FormEvent, useState } from "react";
import useAddTransation from "../hooks/useAddTransation";
import useFriends, { Friend } from "../hooks/useFriends";
import { Transaction } from "../hooks/useTransactions";
import useMe from "../hooks/useMe";
import { Customer } from "../hooks/useCustomers";

interface Props {
  deliver: number;
}
const NewRegisterForm = ({ deliver }: Props) => {
  const { data: result } = useFriends<Friend>();
  const { data: me } = useMe<Customer>();

  const friends = result;
  const addTransaction = useAddTransation();
  const [formData, setFormData] = useState<Transaction>({
    id: 0,
    description: "",
    value: undefined,
    date: "",
    completed: false,
    completed_date: "",
    friend: "",
    completed_by: deliver,
    friend_paid: false,
    is_charge: false,
    boss: me?.id,
  });
  const [inputError, setInputError] = useState("");
  const nextTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputError("");

    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError("");

    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const nextInputCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.checked });
  };

  const nextSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // setFormFriend({ ...formFriend, [e.target.id]: e.target.value });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!formData.description) {
      setInputError("Insira a descrição.");
      return;
    } else if (!formData.value) {
      setInputError("Insira o valor.");
      return;
    }
    // console.log(formData);
    // return;
    addTransaction.mutate({ ...formData });

    let chatBoxRef = document.getElementById("transactions");
    setFormData({ ...formData, description: "", value: undefined });
    setTimeout(() => {
      if (chatBoxRef) {
        chatBoxRef.scrollTop = chatBoxRef.scrollHeight;
      }
      if (formData.is_charge && !addTransaction.isLoading) {
        // nav("/users/" + deliver);
        // window.location.reload();
      }
    }, 1000);

    // if (!addTransaction.isLoading && addTransaction?.data?.id) {
    //   addFriend.mutate({ ...formFriend, id: addTransaction.data.id });
    // }
  };

  return (
    <>
      {addTransaction.isLoading && (
        <span className="text-success">salvand...</span>
      )}
      {inputError && <span className="text-danger">{inputError}</span>}
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <textarea
            placeholder="Descrição"
            className="form-control rounded-0  border-0 border-top border-bottom shadow-none"
            onChange={nextTextArea}
            id="description"
            value={formData.description}
          >
            {formData.description}
          </textarea>
          <div className="form-check text-center p-2">
            {" "}
            <input
              type="checkbox"
              name="is_charge"
              id="is_charge"
              className="form-check-input float-none mx-auto"
              onChange={nextInputCheck}
            />
            <br />
            <label htmlFor="is_charge" className="form-check-label">
              Carregamento
            </label>
          </div>
        </div>

        <div className="d-flex">
          <div className="py-2 w-100">
            <select
              className="form-select rounded-0  border-0 border-bottom shadow-none"
              name="friend"
              id="friend"
              value={formData?.friend}
              onChange={nextSelect}
            >
              <option value={0}>Em nome de...</option>
              {friends?.results?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="py-2 w-100">
            <input
              className="form-control rounded-0 border-0 border-0 border-bottom shadow-none"
              type="number"
              name="value"
              id="value"
              placeholder="Valor"
              value={formData.value}
              onChange={nextInput}
            />
          </div>
          <div className="p-2 flex-shrink-1">
            <button className="btn btn-primary">&rarr;</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewRegisterForm;
