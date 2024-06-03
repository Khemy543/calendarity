import { Ref } from "vue";

export type LayoutTypes = 'day' | 'week' | 'month'
export interface AppDate {
    day: number
    date: Date
}

export interface Keyable {
    [key: string]: number | string | any;
}
export interface CalenadarGetters {
    months: Keyable;
    days: string[];
    layouts: string[];
    getDaysInMonth: (month: number, year: number) => any[];
    getNextPrevMonth: (direction: number, month: number, year: number) => { month: number; year: number };
    getNextPrevWeek: (month: number, date: Date) => { month: number; year: number; date: number }
    getDaysInWeek: (month: number, year: number, date: number) => any[];
    dayTimes: () => string[];
    getDayString: (date: Date) => string;
    getNextPrevDay: (direction: number, date: Date) => { month: number; year: number; date: number};
    getAllTimeSlots: any;
    dayToNumber: Keyable;
}