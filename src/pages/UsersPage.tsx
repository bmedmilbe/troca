import { Link } from "react-router-dom";
import useCustomers, { Customer } from "../hooks/useCustomers";
import useMe from "../hooks/useMe";

const UsersPage = () => {
  const { data } = useCustomers<Customer>({});
  const { data: me } = useMe<Customer>();

  return (
    <div>
      <h1 className="text-center">Utilizadores</h1>
      {!me?.boss && (
        <ul className="list-group">
          {data?.results
            .filter((f) => f.boss == true)
            .map((customer, index) => (
              <li key={index} className="my-2">
                <Link
                  className="btn btn-primary w-100"
                  to={`/users/${customer.id}`}
                >{`${index + 1} - ${customer.first_name} ${
                  customer.last_name
                }`}</Link>
              </li>
            ))}
        </ul>
      )}

      {me?.boss && (
        <ul className="list-group">
          {data?.results.map((customer, index) => (
            <li key={index} className="my-2">
              <Link
                className="btn btn-primary w-100"
                to={`/users/${customer.id}`}
              >{`${index + 1} - ${customer.first_name} ${
                customer.last_name
              }`}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
