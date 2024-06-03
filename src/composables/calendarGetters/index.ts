import { formatTime } from "@/helpers/dates";
import { CalenadarGetters, Keyable, LayoutTypes } from "@/types";

const months = {
  0: "January",
  1: "Februray",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayToNumber: Keyable = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const layouts: LayoutTypes[] = ["month", "week", "day"];

const dayTimes = () => {
  const times = [];
  for (let index = 0; index <= 23; index++) {
    const formatedTime = index.toString() + ":00";
    times.push(formatTime(formatedTime));
  }
  return times;
};

const getNextPrevDay = (direction = 0, date: Date) => {
  const todayDate = new Date();
  if (!direction) {
    return {
      month: todayDate.getMonth(),
      year: todayDate.getFullYear(),
      date: todayDate.getDate(),
    };
  }
  const nextDayDate = new Date(date);
  nextDayDate.setDate(nextDayDate.getDate() + direction);
  return {
    month: nextDayDate.getMonth(),
    year: nextDayDate.getFullYear(),
    date: nextDayDate.getDate(),
  };
};

const getNextPrevMonth = (direction: number, month: number, year: number) => {
  const todayDate = new Date();
  if (!direction) {
    return {
      month: todayDate.getMonth(),
      year: todayDate.getFullYear(),
    };
  }
  const nextMonthDate = new Date(year, month);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + direction);

  return {
    month: nextMonthDate.getMonth(),
    year: nextMonthDate.getFullYear(),
  };
};

const getNextPrevWeek = (direction = 0, date: Date) => {
  if (!direction) {
    date = new Date();
    // get the start of the week of today's date (Sunday)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return {
      month: startOfWeek.getMonth(),
      year: startOfWeek.getFullYear(),
      date: startOfWeek.getDate(),
    };
  } else {
    const daysUntilNextSunday = 7 - date.getDay();
    const nextSunday = new Date(date);
    nextSunday.setDate(date.getDate() + direction * daysUntilNextSunday);
    return {
      month: nextSunday.getMonth(),
      year: nextSunday.getFullYear(),
      date: nextSunday.getDate(),
    };
  }
};

const getDaysInMonth = (
  month = new Date().getMonth(),
  year = new Date().getFullYear()
) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const daysInCurrentMonth = lastDay.getDate();

  const startOffset = firstDay.getDay();

  const monthGrid = [];

  // Previous month's days
  for (
    let i = daysInPreviousMonth - startOffset + 1;
    i <= daysInPreviousMonth;
    i++
  ) {
    const date = new Date(year, month - 1, i);
    monthGrid.push({ day: i, date });
  }

  // Current month's days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const date = new Date(year, month, i);
    monthGrid.push({ day: i, date });
  }

  // Fill in remaining days with next month's days
  const totalDays = monthGrid.length > 35 ? 42 : 35;
  while (monthGrid.length < totalDays) {
    const date: Date = new Date(
      year,
      month + 1,
      monthGrid.length - (daysInCurrentMonth + startOffset) + 1
    );
    monthGrid.push({
      day: monthGrid.length - (daysInCurrentMonth + startOffset) + 1,
      date,
    });
  }

  return monthGrid;
};

// Get days in a week
const getDaysInWeek = (month: number, year: number, date: number) => {
  const newDate = new Date(year, month, date);
  const days = [];
  const currentDay = newDate.getDay();
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(newDate);
    nextDay.setDate(newDate.getDate() - currentDay + i);
    days.push({ day: nextDay.getDate(), date: nextDay });
  }
  return days;
};

const getDayString = (date: Date) => {
  const dayIndex = date.getDay();
  return days[dayIndex];
};


const isTodayDate = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const getters: CalenadarGetters = {
  months,
  days,
  layouts,
  getDaysInMonth,
  getNextPrevMonth,
  getNextPrevWeek,
  getDaysInWeek,
  dayTimes,
  getDayString,
  getNextPrevDay,
  dayToNumber,
  isTodayDate
};
export default getters;
