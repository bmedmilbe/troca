import { useEffect, useState } from "react";
import { SellPaymentExpense } from "../hooks/ground/clients/useSellsByClients";

interface Props {
  sell: SellPaymentExpense;
  remain: number;
  handleDelete: (sell?: SellPaymentExpense) => void;
}
const SellValue = ({ sell, remain, handleDelete }: Props) => {
  const [value, setValue] = useState<number>();
  const [currentSell, setCurrentSell] = useState<SellPaymentExpense>();

  useEffect(() => {
    setValue((sell.price || sell.value) + 0);
    setCurrentSell(sell);
    setColor(handleColor(sell));
  }, [currentSell?.date]);
  const [buttonsOpen, setButtonsOpen] = useState(false);

  const [color, setColor] = useState("");

  const handleColor = (tr: SellPaymentExpense) => {
    if (tr.destine || tr.price) return "text-warning";

    return "text-success";
  };

  const formatNumberWithCommas = (number: number) => {
    if (typeof number !== "number") {
      return "Invalid input. Please provide a number.";
    }

    if (Math.abs(number) < 1000) {
      return number.toString(); // No formatting needed for numbers less than 1000
    }

    return number.toLocaleString(); // Use toLocaleString() for easy comma formatting
  };

  return (
    <>
      <div className="d-flex flex-column m-2">
        <div
          className={`fw-bold fs-4 ${color}`}
          onClick={() => setButtonsOpen(!buttonsOpen)}
        >
          {formatNumberWithCommas(value || 0)}
        </div>

        <div
          className="badge w-100 text-success text-lowercase"
          id={`hfh${currentSell?.id}`}
        >
          {formatNumberWithCommas(remain)}
        </div>
      </div>
      {buttonsOpen && (
        <div className="d-flex justify-content-center border">
          <button
            onClick={() => handleDelete(currentSell)}
            className="m-1 btn btn-danger btn-sm"
          >
            Apagar
          </button>
        </div>
      )}
    </>
  );
};

export default SellValue;
