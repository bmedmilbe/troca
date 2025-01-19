import React, { FormEvent, useState } from "react";
import useAuthRegister from "../hooks/useAuthRegister";
import { UserRegister } from "../services/authServices";

const RegisterForm = () => {
  const [formData, setFormData] = useState<UserRegister>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
    parthner: 5,
  });

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const userRegister = useAuthRegister();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    // console.log(formData);
    // return;
    userRegister.mutate({ ...formData, username: formData.email });

    // Send data to server (e.g., using fetch)
    // console.log(data);
  };
  return (
    <>
      <h1 className="fs-4 text-center">Registrar no sistema</h1>
      {userRegister.error && (
        <div className="alert alert-danger">{userRegister.error.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                Nome
              </label>
              <input
                className="form-control"
                type="text"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={nextInput}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Sobrenome
              </label>
              <input
                className="form-control"
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={nextInput}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={nextInput}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={nextInput}
              />
            </div>
          </div>
          <div className="col-sm-12 d-flex justify-content-center">
            <button
              className="btn btn-primary my-3"
              disabled={userRegister.isLoading}
            >
              {userRegister.isLoading ? "Registando..." : "Criar conta"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
