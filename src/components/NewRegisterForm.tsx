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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const [valueToSend, setValueToSend] = useState<number>();

  const nextTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputError("");

    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError("");

    setValueToSend(parseInt(e.target.value.replace(/\D/g, "")));
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas

    // setFormData({ ...formData, [e.target.id]: e.target.value });
    setFormData({ ...formData, [e.target.id]: formattedValue });
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
    setIsLoading(true);
    // console.log(formData);
    // return;
    addTransaction
      .mutateAsync({ ...formData, value: valueToSend })
      .then((res) => {
        let chatBoxRef = document.getElementById("transactions");
        setFormData({ ...formData, description: "", value: 0 });
        setTimeout(() => {
          if (chatBoxRef) {
            chatBoxRef.scrollTop = chatBoxRef.scrollHeight;
            setIsLoading(false);
          }
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    // if (!addTransaction.isLoading && addTransaction?.data?.id) {
    //   addFriend.mutate({ ...formFriend, id: addTransaction.data.id });
    // }
  };

  return (
    <>
      {isLoading && <span className="text-success">salvando...</span>}
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
              type="text"
              name="value"
              id="value"
              placeholder="Valor"
              min={1}
              value={formData.value}
              onChange={nextInput}
            />
          </div>
          <div className="p-2 flex-shrink-1">
            <button disabled={isLoading} className="btn btn-primary">
              {!isLoading ? <span>&rarr;</span> : "..."}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewRegisterForm;
