import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginPage = () => {
  const [onLogin, setOnLogin] = useState(true);

  return (
    <>
      <div className="d-flex">
        <button
          className="btn btn-primary w-100"
          disabled={onLogin}
          onClick={() => setOnLogin(true)}
        >
          Entrar
        </button>
        <button
          className="btn btn-primary w-100"
          disabled={!onLogin}
          onClick={() => setOnLogin(!true)}
        >
          Criar conta
        </button>
      </div>
      {onLogin && <LoginForm />}
      {!onLogin && <RegisterForm />}
    </>
  );
};

export default LoginPage;
