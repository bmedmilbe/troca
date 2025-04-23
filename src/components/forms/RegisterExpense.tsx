import React, { FormEvent, useState } from "react";
import useAddExpense from "../../hooks/ground/destine/useAddExpense";
import useAddExpensePayment from "../../hooks/ground/destine/useAddExpensePayment";

interface Props {
  destineId: number;
}
export interface NewSellPayment {
  id: number;
  value: number;
  is_payment: boolean;
}
const RegisterExpense = ({ destineId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const addTransaction = useAddTransation();
  const [formData, setFormData] = useState<NewSellPayment>({
    id: 0,
    value: 0,
    is_payment: false,
  });
  const [inputError, setInputError] = useState("");
  const addExpense = useAddExpense(destineId);
  const addExpensePayment = useAddExpensePayment(destineId);

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError("");

    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas

    // setFormData({ ...formData, [e.target.id]: e.target.value });
    setFormData({ ...formData, [e.target.id]: formattedValue });
  };
  const nextInputCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.checked });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!formData.value) {
      setInputError("Insira o valor do destinado ou reembolsado");
      return;
    }

    setIsLoading(true);
    if (!formData.is_payment) {
      console.log({ ...formData, price: formData.value });
      addExpense
        .mutateAsync({
          ...formData,
          value: parseInt(`${formData.value}`.replace(/\D/g, "")) || 0,
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          location.href = "/ground/expenses/" + destineId;
          setFormData({
            ...formData,
            id: 0,
            value: 0,
            is_payment: false,
          });

          let chatBoxRef = document.getElementById("opslist");
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
          setInputError("Algo correu mal");
        });
    } else {
      console.log({ ...formData });
      addExpensePayment
        .mutateAsync({
          ...formData,
          value: parseInt(`${formData.value}`.replace(/\D/g, "")) || 0,
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          location.href = "/ground/expenses/" + destineId;

          setFormData({
            ...formData,
            id: 0,
            value: 0,
            is_payment: false,
          });

          let chatBoxRef = document.getElementById("opslist");
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
          setInputError("Algo correu mal");
        });
    }
  };

  return (
    <>
      {isLoading && <span className="text-success">salvando...</span>}
      {inputError && <span className="text-danger">{inputError}</span>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control rounded-0 border-0 border-0 border-bottom shadow-none"
              type="text"
              name="value"
              id="value"
              placeholder="Preço Total ou Valor Recebido"
              min={1}
              value={formData.value || ""}
              onChange={nextInput}
            />
          </div>

          <div className="col-6 d-flex justify-content-between">
            <div className="form-check text-center p-2">
              <input
                type="checkbox"
                name="is_payment"
                id="is_payment"
                className="form-check-input float-none mx-auto"
                onChange={nextInputCheck}
              />
              <br />
              <label htmlFor="is_payment" className="form-check-label">
                É reembolso
              </label>
            </div>
            <div className="p-2 flex-shrink-1">
              <button disabled={isLoading} className="btn btn-primary">
                {!isLoading ? <span>&rarr;</span> : "..."}
              </button>
            </div>
          </div>
        </div>

        <div className="col-12"></div>
      </form>
    </>
  );
};

export default RegisterExpense;
