import moment from "moment";
import "moment/dist/locale/ru";

export const formatTransfers = (transfers: number) => {
  if (transfers === 0) return "Нет Пересадок";
  if (transfers === 1) {
    return transfers + " пересадка";
  } else if (transfers > 1 && transfers < 5) {
    return transfers + " пересадки";
  } else {
    return transfers + " пересадок";
  }
};

export function convertDate(inputDate: string) {
  const inputDateDay = moment(inputDate).format("dd").toUpperCase();
  const outputDate = moment(inputDate).format("ll");
  return `${outputDate},${inputDateDay}`;
}

export const priceFormatToLocale = (price: number, type: string) => {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: type }).format(price);
};
