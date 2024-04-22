import { resetFilters } from "../../store/ticketSlice";
import { useAppDispatch } from "../../utils/redux-hooks";
import CurrencyFilter from "../CurrencyFilter/CurrencyFilter";
import TransferFilter from "../TransferFilter/TransferFilter";
import "./style.scss";

const FilterWrapper = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="filter__wrapper">
      <CurrencyFilter />
      <TransferFilter />
      <button onClick={() => dispatch(resetFilters({ currency: null, stops: [] }))}>reset filters</button>
    </div>
  );
};

export default FilterWrapper;
