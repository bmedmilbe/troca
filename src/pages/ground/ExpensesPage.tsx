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
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            &rarr; {destine.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ExpensesPage;
