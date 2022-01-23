type TDateFormat = "YYYY-MM-DD"

type TFormattedDates = {
  [key in TDateFormat]: string
}

export const datetimeNormalization = (date: Date, format: TDateFormat) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  const formattedDates: TFormattedDates = {
    "YYYY-MM-DD": `${year}-${month < 10 ? `0${month}` : month}-${dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth}`,
  };

  return formattedDates[format];
};
