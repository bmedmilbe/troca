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
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            &rarr; {client.name} {client.tel ? "|" : ""} {client.tel || ""}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ClientsPage;
