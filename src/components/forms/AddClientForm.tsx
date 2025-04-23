import React, { FormEvent, useState } from "react";
import useAddClient from "../../hooks/ground/clients/useAddClient";
export interface Client {
  id: number;
  name: string;
  tel: string;
}
const AddClientForm = () => {
  const [formData, setFormData] = useState<Client>({
    id: 0,
    name: "",
    tel: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //   const userLogin = useAuth();
  const addClient = useAddClient();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    if (formData.name == "") {
      setError("Insira o nome do vendedor.");
      setLoading(false);
      return;
    }
    setLoading(true);
    addClient
      .mutateAsync({
        ...formData,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setFormData({
          ...formData,
          name: "",
          tel: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Algo correu mal");
      });
    // userLogin.mutate(formData);
    // console.log(userLogin.isSuccess);

    // Send data to server (e.g., using fetch)
    // console.log(data);
  };
  return (
    <>
      <h1 className="fs-4 text-center">Novo vendedor</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="p-2 flex-grow-1">
            <input
              required
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="Nome do vendedor"
              value={formData.name}
              onChange={nextInput}
            />
          </div>
          <div className="p-2 flex-grow-1">
            <input
              className="form-control"
              type="tel"
              name="tel"
              id="tel"
              placeholder="Telemóvel"
              value={formData.tel}
              onChange={nextInput}
            />
          </div>

          <div className="p-2">
            <button
              className="btn btn-primary"
              disabled={
                loading || formData.name == "" || formData.name.length <= 3
              }
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddClientForm;
