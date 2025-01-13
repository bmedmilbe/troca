const day = (newdate: string) => {
  const date = new Date(newdate);
  return date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
};
const month = (newdate: string) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const date = new Date(newdate);
  return months[date.getMonth()];
};

export { month, day };
