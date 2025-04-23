import { Navigate } from "react-router-dom";
import { Customer } from "../hooks/useCustomers";
import useMe from "../hooks/useMe";
import GroundLayout from "./GroundLayout";

const GroundPrivateLayout = () => {
  const { data, isLoading } = useMe<Customer>();
  // console.log(data);

  // if (data) return <Layout />;
  // if (!data) return <Navigate to="/login" />;
  if (!localStorage.getItem("access")) return <Navigate to="/login" />;

  if (!isLoading) {
    if (data) return <GroundLayout />;
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="position-relative vh-100">
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // return !isLoading && data ? <Layout /> : ;
};

export default GroundPrivateLayout;
