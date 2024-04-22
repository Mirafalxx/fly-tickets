import { useEffect } from "react";
import FilterWrapper from "./components/FilterWrapper/FilterWrapper";
import Tickets from "./components/Tickets/Tickets";
import { useAppDispatch } from "./utils/redux-hooks";
import {
  fetchTickets,
  getSelectedCurrency,
  getTickets,
  getSelectedStops,
  Ticket,
  loading,
} from "./store/ticketSlice";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/dist/locale/ru";

moment.locale("ru");

const filterTicketsByCriteria = (
  tickets: Ticket[],
  currencyCriteria: string | null,
  stopsCriteria: number[],
) => {
  if (tickets)
    return tickets.filter((ticket) => {
      return (
        (currencyCriteria === null || ticket.currency === currencyCriteria) &&
        (!stopsCriteria.length || stopsCriteria.includes(ticket.stops))
      );
    });
};

const App = () => {
  const dispatch = useAppDispatch();
  const tickets = useSelector(getTickets);
  const loadingTickets = useSelector(loading);
  const selectedCurrency = useSelector(getSelectedCurrency);
  const selectedStops = useSelector(getSelectedStops);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const filteredTickets = filterTicketsByCriteria(tickets, selectedCurrency, selectedStops);

  return (
    <div className="app">
      <div className="tickets">
        <FilterWrapper />

        {loadingTickets ? (
          <div className="display_condition">Идет Загрузка...</div>
        ) : (
          <>
            {filteredTickets?.length && !loadingTickets ? (
              <Tickets tickets={filteredTickets} />
            ) : (
              <div className="display_condition">Билеты не найдены</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
