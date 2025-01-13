import React, { FormEvent, useState } from "react";
import useAddTransation, { NewTransaction } from "../hooks/useAddTransation";
import useFriends from "../hooks/useFriends";
import useAddFriendToTransaction, {
  FriendSending,
} from "../hooks/useAddFriendToTransaction";

const NewRegisterForm = () => {
  const { data: friends } = useFriends();
  const addFriend = useAddFriendToTransaction();
  // console.log(friends);
  const addTransaction = useAddTransation();
  const [formData, setFormData] = useState<NewTransaction>({
    description: undefined,
    value: undefined,
  });
  const [formFriend, setFormFriend] = useState<FriendSending>({
    friend: undefined,
    friend_paid: false,
  });
  const nextTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const nextSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormFriend({ ...formFriend, [e.target.id]: e.target.value });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    addTransaction.mutate({ ...formData, ...formFriend });

    if (addTransaction.isSuccess && !addTransaction.isLoading) {
      let chatBoxRef = document.getElementById("transactions");

      setTimeout(() => {
        if (chatBoxRef) {
          chatBoxRef.scrollTop = chatBoxRef.scrollHeight + 10;
        }
      }, 300);
    }

    // if (!addTransaction.isLoading && addTransaction?.data?.id) {
    //   addFriend.mutate({ ...formFriend, id: addTransaction.data.id });
    // }
  };

  return (
    <>
      {/* <h1 className="fs-4 text-center">Registrar valor</h1> */}
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
            <select
              className="form-select rounded-0  border-0 border-bottom shadow-none"
              name="friend"
              id="friend"
              value={formFriend.friend}
              onChange={nextSelect}
            >
              <option value={0}>Em nome de...</option>
              {friends?.map((a) => (
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
