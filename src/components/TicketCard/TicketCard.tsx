import React from "react";
import turkishLogo from "../../assets/images/turkish-airlanes.png";
import { convertDate, formatTransfers, priceFormatToLocale } from "../../utils/utils";
import "./style.scss";
import { Ticket } from "../../store/ticketSlice";

const TicketCard: React.FC<Ticket> = ({ ...props }) => {
  return (
    <div className="ticket__card">
      <div className="ticket__card__price">
        <img src={turkishLogo} alt="Turkish Airlines Logo" />
        <button className="ticket__card__price__buy-btn">
          Купить <br />
          за {priceFormatToLocale(props.price, props.currency)}
        </button>
      </div>
      <div className="divider"></div>
      <div className="ticket__card__main-information">
        <div className="time-section">
          <p className="time">{props.departure_time}</p>
          <p className="place">{` ${props.origin_name} ,${props.origin}`}</p>
          <p className="date">{convertDate(props.departure_date)}</p>
        </div>
        <div className="stop">{formatTransfers(props.stops)}</div>
        <div className="time-section">
          <p className="time">{props.arrival_time}</p>
          <p className="place">{`${props.destination}, ${props.destination_name}`}</p>
          <p className="date">{convertDate(props.arrival_date)}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
