import React from "react";
import TicketCard from "../TicketCard/TicketCard";
import "./style.scss";
import { Ticket } from "../../store/ticketSlice";

const Tickets: React.FC<{ tickets: Ticket[] | undefined }> = ({ tickets }) => {
  return (
    <div className="tickets__wrapper">
      {tickets?.map((ticket) => {
        return <TicketCard {...ticket} key={ticket.id} />;
      })}
    </div>
  );
};

export default Tickets;
