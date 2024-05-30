import { ref } from "vue";
import { formatTime } from "@/helpers/dates";

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

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const layouts = ["month", "week", "day"];

const meetingDurationOptions = [
    { value: 5, text: "5 minutes" },
    { value: 10, text: "10 minutes" },
    { value: 15, text: "15 minutes" },
    { value: 20, text: "20 minutes" },
]

const weekSevenDays = ref<Date[]>([]);

const dayTimes = () => {
    const times = [];
    for (let index = 0; index <= 23; index++) {
        const formatedTime = index.toString() + ":00";
        times.push(formatTime(formatedTime));
    }
    return times;
};

const getNextPrevDay = (direction: number, date: Date) => {
    const todayDate = new Date();
    if (!direction) {
        return {
            month: todayDate.getMonth(),
            year: todayDate.getFullYear(),
            date: todayDate.getDay(),
        };
    }
    const nextDayDate = new Date(date);
    nextDayDate.setDate(nextDayDate.getDate() + direction);

    return {
        month: nextDayDate.getMonth(),
        year: nextDayDate.getFullYear(),
        date: nextDayDate.getDate(),
    };
}

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
    const daysUntilNextSunday = 7 - date.getDay();
    const nextSunday = new Date(date);
    nextSunday.setDate(
        date.getDate() + direction * daysUntilNextSunday
    );

    const days: Date[] = [];
    if (!direction) {
        const currentDayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - currentDayOfWeek);
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(startOfWeek);
            nextDay.setDate(startOfWeek.getDate() + i);
            days.push(nextDay);
        }
    } else {
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(nextSunday);
            nextDay.setDate(nextSunday.getDate() + i);
            days.push(nextDay);
        }
    }
    weekSevenDays.value = [...days];
    return {
        month: days[0].getMonth(),
        year: days[0].getFullYear(),
        date: days[0].getDate(),
    };
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
        const dayOfWeek = date.getDate();
        monthGrid.push({ day: i, isCurrentMonth: false, date, dayOfWeek });
    }

    // Current month's days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        const date = new Date(year, month, i);
        const dayOfWeek = date.getDate();
        monthGrid.push({ day: i, isCurrentMonth: true, date, dayOfWeek });
    }

    // Fill in remaining days with next month's days
    const totalDays = monthGrid.length > 35 ? 42 : 35;
    while (monthGrid.length < totalDays) {
        const date: Date = new Date(
            year,
            month + 1,
            monthGrid.length - (daysInCurrentMonth + startOffset) + 1
        );
        const dayOfWeek:number = date.getDate();
        monthGrid.push({
            day: monthGrid.length - (daysInCurrentMonth + startOffset) + 1,
            isCurrentMonth: false,
            date,
            dayOfWeek,
            showModal: false,
        });
    }

    return monthGrid;
};

const getDaysInWeek = (
    weekAggregator = 0
) => {
    const today = new Date();
    const currentDayIndex = today.getDay();

    const nextPreviousOrweekDays = [];

    if (!weekAggregator || weekAggregator === 0) {
        for (let i = 0; i < 7; i++) {
            const dayIndex = (currentDayIndex + i) % 7; // Ensure the index wraps around

            const newDayIndex = dayIndex == 0 ? 6 : dayIndex - 1;

            const currentWeekDate = new Date(today);

            currentWeekDate.setDate(today.getDate() - currentDayIndex + i);

            nextPreviousOrweekDays.push({
                day: currentWeekDate.getDate(),
                isCurrentMonth: false,
                date: currentWeekDate,
                dayName: days[newDayIndex].substring(0, 3),
            });
        }

        return nextPreviousOrweekDays;
    }

    for (let i = 0; i < 7; i++) {
        const dayIndex = (currentDayIndex + i) % 7; // Ensure the index wraps around

        const newDayIndex = dayIndex == 0 ? 6 : dayIndex - 1;

        const nextOrPreviousWeekDate = new Date(today); // Create a new Date object

        nextOrPreviousWeekDate.setDate(
            today.getDate() + (weekAggregator - 1) + i
        ); // Add 7 days to the current date

        nextPreviousOrweekDays.push({
            day: nextOrPreviousWeekDate.getDate(),
            isCurrentMonth: false,
            date: nextOrPreviousWeekDate,
            dayName: days[newDayIndex].substring(0, 3),
        });
    }

    return nextPreviousOrweekDays;
};

const getDayString = (date: Date) => {
    const dayIndex = date.getDay();
    return days[dayIndex];
};

const getters = {
    months,
    days,
    layouts,
    getDaysInMonth,
    getNextPrevMonth,
    getNextPrevWeek,
    getDaysInWeek,
    dayTimes,
    weekSevenDays,
    meetingDurationOptions,
    getDayString,
    getNextPrevDay
};
export default getters;
