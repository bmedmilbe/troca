import React, { FormEvent, useState } from "react";
import { useProducts } from "../../hooks/ground/products/useProducts";
import useAddSell from "../../hooks/ground/clients/useAddSell";
import useAddClientPayment from "../../hooks/ground/clients/useAddClientPayment";

interface Props {
  clientId: number;
}
export interface NewSellPayment {
  id: number;
  product: number;
  quantity: number;
  price: number;
  value: number;
  is_payment: boolean;
}
const RegisterSell = ({ clientId: clientId }: Props) => {
  const { data: products } = useProducts();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const addTransaction = useAddTransation();
  const [formData, setFormData] = useState<NewSellPayment>({
    id: 0,
    value: 0,
    product: 0,
    quantity: 0,
    price: 0,
    is_payment: false,
  });
  const [inputError, setInputError] = useState("");
  const addSell = useAddSell(clientId);
  const addClientPayment = useAddClientPayment(clientId);

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

  const nextSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // setFormFriend({ ...formFriend, [e.target.id]: e.target.value });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!formData.value) {
      setInputError("Insira o valor do produto ou recebido");
      return;
    }
    if (!formData.is_payment && !formData.product) {
      setInputError("Selecione o produto se não for um pagamento");
      return;
    }
    if (!formData.is_payment && !formData.quantity) {
      setInputError("Inisira o peso do produto se não for um pagamento");
      return;
    }
    setIsLoading(true);
    if (!formData.is_payment) {
      console.log({ ...formData, price: formData.value });
      addSell
        .mutateAsync({
          ...formData,
          price: parseInt(`${formData.value}`.replace(/\D/g, "")) || 0,
          value: parseInt(`${formData.value}`.replace(/\D/g, "")) || 0,
          quantity: parseInt(`${formData.quantity}`.replace(/\D/g, "")) || 0,
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          location.href = "/ground/clients/" + clientId;
          setFormData({
            ...formData,
            id: 0,
            value: 0,
            product: 0,
            quantity: 0,
            price: 0,
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
      console.log({ ...formData, price: formData.value });
      addClientPayment
        .mutateAsync({
          ...formData,
          price: parseInt(`${formData.value}`.replace(/\D/g, "")) || 0,
          value: parseInt(`${formData.value}`.replace(/\D/g, "")) || 0,
          quantity: parseInt(`${formData.quantity}`.replace(/\D/g, "")) || 0,
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          location.href = "/ground/clients/" + clientId;

          setFormData({
            ...formData,
            id: 0,
            value: 0,
            product: 0,
            quantity: 0,
            price: 0,
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
          <div className="col-6">
            <input
              className="form-control rounded-0 border-0 border-0 border-bottom shadow-none"
              type="text"
              name="quantity"
              id="quantity"
              placeholder="Kg"
              min={1}
              value={formData.quantity || ""}
              onChange={nextInput}
            />
          </div>
          <div className="col-6">
            <select
              className="form-select rounded-0  border-0 border-bottom shadow-none"
              name="product"
              id="product"
              value={formData?.product}
              onChange={nextSelect}
            >
              <option value={0}>Produto...</option>
              {products?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
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
                É pagamento
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

export default RegisterSell;
