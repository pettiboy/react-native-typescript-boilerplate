export const printableDate = (dateTimeString: string) => {
  return (
    `${new Date(dateTimeString).toDateString()} at ` +
    `${toHoursAndMinutes(dateTimeString)}`
  );
};

export const printableDateRange = (
  fromDateTime: string,
  toDateTime: string,
) => {
  return `${new Date(fromDateTime).toDateString()}: ${toHoursAndMinutes(
    fromDateTime,
  )} - ${toHoursAndMinutes(toDateTime)}`;
};

const toHoursAndMinutes = (dateTimeString: string) => {
  let d = new Date(dateTimeString);
  let pm = d.getHours() >= 12;
  let hour12 = d.getHours() % 12;
  if (!hour12) hour12 += 12;
  let minute = d.getMinutes().toString();
  if (minute === '0') minute = '00';
  const time = `${hour12}:${minute} ${pm ? 'pm' : 'am'}`;
  return time;
};
