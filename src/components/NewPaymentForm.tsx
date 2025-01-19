import React, { FormEvent, useState } from "react";
import useAddPayment, { NewPayment } from "../hooks/useAddPayment";

interface Props {
  friend: number;
}
const NewPaymentForm = ({ friend }: Props) => {
  const addPayment = useAddPayment(friend);
  const [formData, setFormData] = useState<NewPayment>({
    description: "",
    value: 500,
    friend: friend,
  });

  const nextTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    console.log(formData);
    // return;
    addPayment.mutate({ ...formData });

    setTimeout(() => {
      // window.location.reload();
    }, 300);

    // if (!addTransaction.isLoading && addTransaction?.data?.id) {
    //   addFriend.mutate({ ...formFriend, id: addTransaction.data.id });
    // }
  };

  return (
    <>
      {addPayment.isLoading && <span className="text-success">salvand...</span>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Descrição"
          className="form-control rounded-0  border-0 border-top border-bottom shadow-none"
          onChange={nextTextArea}
          id="description"
          value={formData.description}
        >
          {formData.description}
        </textarea>
        <div className="d-flex">
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

export default NewPaymentForm;
