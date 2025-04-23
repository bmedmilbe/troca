import { Link } from "react-router-dom";
import AddProductForm from "../../components/forms/AddProductForm";
import { useProducts } from "../../hooks/ground/products/useProducts";

const ProductsPage = () => {
  const { data } = useProducts();

  return (
    <>
      <AddProductForm />
      <h1 className="fs-4 text-center">Produtos</h1>

      <div className="list-group">
        {data?.map((product, key) => (
          <Link
            key={key}
            // to={`/ground/products/${product.id}`}
            to={`#`}
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            &rarr; {product.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
