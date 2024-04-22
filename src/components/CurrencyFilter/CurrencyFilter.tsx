import cn from "classnames";
import { useSelector } from "react-redux";
import { getCurrencies, getSelectedCurrency, selectCurrency } from "../../store/ticketSlice";
import "./style.scss";
import { useAppDispatch } from "../../utils/redux-hooks";

const CurrencyFilter = () => {
  const dispatch = useAppDispatch();
  const currencies = useSelector(getCurrencies);
  const selectedCurrency = useSelector(getSelectedCurrency);

  return (
    <div className="currency">
      <p className="currency__title">Валюта</p>
      <div className="container">
        {currencies.map((curr) => (
          <div
            key={curr.value}
            className={cn("item", { active: curr.value === selectedCurrency })}
            onClick={() => dispatch(selectCurrency(curr.value))}
          >
            {curr.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyFilter;
