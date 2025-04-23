import React, { FormEvent, useState } from "react";
import useAddDestine from "../../hooks/ground/destine/useAddDestine";
export interface Destine {
  id: number;
  name: string;
}
const AddDestineForm = () => {
  const [formData, setFormData] = useState<Destine>({
    id: 0,
    name: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const addDestine = useAddDestine();

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //   const userLogin = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (formData.name == "") {
      setError("Insira o nome da despesa/destino.");
      setLoading(false);
      return;
    }
    setLoading(true);
    addDestine
      .mutateAsync({
        ...formData,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setFormData({
          ...formData,
          name: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Algo correu mal");
      });
  };
  return (
    <>
      <h1 className="fs-4 text-center">Novo Destino</h1>
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
              placeholder="Nome destino"
              value={formData.name}
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

export default AddDestineForm;
