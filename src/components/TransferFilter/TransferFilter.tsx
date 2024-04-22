import { useSelector } from "react-redux";
import Checkbox from "../Checkbox/Checkbox";
import "./style.scss";
import {
  Stops,
  bulkSelectStop,
  getSelectedStops,
  getStops,
  removeStops,
  selectStops,
} from "../../store/ticketSlice";
import { useAppDispatch } from "../../utils/redux-hooks";

const TransferFilter = () => {
  const dispatch = useAppDispatch();
  const stops = useSelector(getStops);
  const selectedStops = useSelector(getSelectedStops);

  const handleChangeSelectedStops = (e: React.ChangeEvent<HTMLInputElement>, stop: number) => {
    if (e.target.checked) {
      dispatch(selectStops(stop));
    } else {
      dispatch(removeStops(stop));
    }
  };

  const handleBulkSelectStops = (e: React.ChangeEvent<HTMLInputElement>, stops: Stops[] | []) => {
    if (e.target.checked) {
      dispatch(bulkSelectStop(stops));
    } else {
      dispatch(bulkSelectStop([]));
    }
  };

  console.log(selectedStops);

  return (
    <div className="transfer">
      <p className="transfer__title">количество пересадок</p>
      <Checkbox
        id="1"
        text="Все"
        onChange={(e) => handleBulkSelectStops(e, stops)}
        checked={selectedStops?.length === stops.length}
      />
      {stops.map((item) => {
        return (
          <Checkbox
            id={item.label}
            text={item.label}
            value={item.value}
            checked={selectedStops?.includes(item.value)}
            key={item.id}
            onChange={(e) => handleChangeSelectedStops(e, item.value)}
          />
        );
      })}
    </div>
  );
};

export default TransferFilter;
