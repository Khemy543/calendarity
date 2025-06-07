export type LayoutTypes = 'day' | 'week' | 'month'

export type ColorTypes = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
export interface AppDate {
    day: number
    date: Date
}

export interface Keyable {
    [key: string]: number | string | any;
}

export interface CalendarEvent {
    id: string | number;
    title: string;
    start: Date | string;
    end: Date | string;
    description?: string;
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
    dayToNumber: Keyable;
    isTodayDate: (date: Date) => boolean;
    numberToDay: Keyable;
}
