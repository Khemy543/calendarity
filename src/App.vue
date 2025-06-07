<template>
  <CalendarHeader
    :year="currentYear"
    :month="currentMonth"
    :active-layout="currentLayout"
    :current-date="currentDate"
    @change-layout="handleLayoutchange"
    @change="handleChange"
  />
  <Component
    :is="layouts[currentLayout]"
    :dates="dates"
    :layout="currentLayout"
    :current-date="currentDate"
    :events="events"
  />
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { calendarGetters } from "@/composables";
import CalendarHeader from "@/components/CalendarHeader/CalendarHeader.vue";
import DayLayout from "@/components/Layouts/Day/Day.vue";
import WeekLayout from "@/components/Layouts/Week/Week.vue";
import MonthLayout from "@/components/Layouts/Month/Month.vue";
import type { AppDate, Keyable, LayoutTypes, CalendarEvent } from "@/types";

// define constants
const layouts: Keyable = {
  day: DayLayout,
  week: WeekLayout,
  month: MonthLayout,
};

const events: CalendarEvent[] = [
  {
    id: 1,
    title: "Lecture",
    start: "2024-06-12T10:30:00",
    end: "2024-06-12T11:30:00",
    description: "Lecture",
  },
  {
    id: 2,
    title: "Exams",
    start: "2024-06-12T10:30:00",
    end: "2024-06-12T11:30:00",
    description: "Lecture",
  },
];

// define refs
const currentLayout = ref<LayoutTypes>("month");

const dates = ref<AppDate[]>([]);

const todayDate = new Date();

const currentDate = ref<Date>(todayDate);

const currentYear = ref<number>(todayDate.getFullYear());

const currentMonth = ref<number>(todayDate.getMonth());

const getDays = (month: number, year: number, date = 1) => {
  dates.value = [];
  currentMonth.value = month;
  currentYear.value = year;
  currentDate.value = new Date(year, month, date);

  if (currentLayout.value === "month") {
    dates.value = calendarGetters.getDaysInMonth(month, year);
  } else if (currentLayout.value === "week") {
    dates.value = calendarGetters.getDaysInWeek(month, year, date);
  }
};

const handleLayoutchange = (newLayout: LayoutTypes) => {
  currentLayout.value = newLayout;
};

const handleChange = ({
  month,
  year,
  date,
}: {
  month: number;
  year: number;
  date?: number;
}) => {
  getDays(month, year, date);
};

onMounted(() => {
  getDays(todayDate.getMonth(), todayDate.getFullYear(), todayDate.getDate());
});

watch(currentLayout, () => {
  getDays(currentMonth.value, currentYear.value, currentDate.value.getDate());
});
</script>
<style scoped></style>
