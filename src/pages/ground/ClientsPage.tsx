import { Link } from "react-router-dom";
import AddClientForm from "../../components/forms/AddClientForm";
import { useClients } from "../../hooks/ground/clients/useClients";

const ClientsPage = () => {
  const { data } = useClients();
  return (
    <>
      <AddClientForm />
      <h1 className="fs-4 text-center">Vendedores</h1>

      <div className="list-group">
        {data?.map((client, key) => (
          <Link
            key={key}
            to={`/ground/clients/${client.id}`}
            className="list-group-item list-group-item-action d-flex"
            aria-current="true"
          >
            <span className="flex-grow-1 p-2">
              &rarr; {client.name} {client.tel ? "|" : ""} {client.tel || ""}
            </span>
            <div
              className={`fw-bold p-2 ${
                parseInt(client?.balance || "0") >= 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {client.balance || ""}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ClientsPage;
