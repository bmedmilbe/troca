import { Link } from "react-router-dom";
import { useDestines } from "../../hooks/ground/destine/useDestines";
import AddDestineForm from "../../components/forms/AddDestineForm";

const ExpensesPage = () => {
  const { data } = useDestines();

  return (
    <>
      <AddDestineForm />
      <h1 className="fs-4 text-center">Despesas</h1>

      <div className="list-group">
        {data?.map((destine, key) => (
          <Link
            key={key}
            to={`/ground/expenses/${destine.id}`}
            className="list-group-item list-group-item-action d-flex"
            aria-current="true"
          >
            <span className="flex-grow-1 p-2">&rarr; {destine.name} </span>
            <div
              className={`fw-bold p-2 ${
                parseInt(destine?.balance || "0") >= 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {destine.balance || ""}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ExpensesPage;
