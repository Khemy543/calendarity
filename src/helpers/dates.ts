const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const formateDate = (date: Date) => {
  if (!date) return null;
  const newDate = new Date(date);
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  return `${newDate.getFullYear()}-${month}-${newDate.getDate()}`;
};

export const formateDateSlash = (date: Date) => {
  if (!date) return null;
  const newDate = new Date(date);
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  return `${newDate.getDate()}/${month}/${newDate.getFullYear()}`;
};

export const formatTime = (time: string) => {
  const timeArr = time.split(":");
  const timeInt = parseInt(timeArr[0], 10);
  if (timeInt >= 12) {
    return timeInt == 12
      ? `${timeInt}:${timeArr[1]} PM`
      : `${timeInt - 12}:${timeArr[1]} PM`;
  }

  return `${timeArr[0]}:${timeArr[1]} AM`;
};

export const isDateTheSame = (date1: Date, date2: Date) => {
  const newDate1 = new Date(date1).toDateString();
  const newDate2 = new Date(date2).toDateString();

  return newDate1 === newDate2;
};

export const getDayString = (day: number) => weekday[day];

export const formatTimeTo12Hour = (time: Date) => {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours < 12 ? "AM" : "PM";
  if (hours > 12) {
    hours -= 12;
  }

  return `${hours || 12}:${minutes}${period}`;
};

export const formateLocalDateTime = (date: Date, time: Date) => {
  const newDate = new Date(date);
  const newTime = new Date(time);
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const hours = String(newTime.getHours()).padStart(2, "0");
  const minutes = String(newTime.getMinutes()).padStart(2, "0");
  return `${newDate.getFullYear()}-${month}-${day} ${hours}:${minutes}`;
};