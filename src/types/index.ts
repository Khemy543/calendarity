export interface AppDate {
    day: number
    date: Date
}
export interface CalenadarGetters {
    months: string[];
    days: string[];
    layouts: string[];
    getDaysInMonth: (month: number, year: number) => any[];
    getNextPrevMonth: (month: number, year: number, direction: string) => { month: number; year: number };
    getNextPrevWeek: (month: number, year: number, date: number, direction: string) => any[];
    getDaysInWeek: (month: number, year: number, date: number) => any[];
    dayTimes: () => string[];
    weekSevenDays: () => string[];
    getDayString: (date: Date) => string;
    getNextPrevDay: (date: Date, direction: string) => Date;
    getAllTimeSlots: any;
    dayToNumber: (day: string) => number;
}