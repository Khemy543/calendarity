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
  />
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { calendarGetters } from "@/composables";
import CalendarHeader from "@/components/CalendarHeader/CalendarHeader.vue";
import DayLayout from "@/components/Layouts/Day.vue";
import WeekLayout from "@/components/Layouts/Week.vue";
import MonthLayout from "@/components/Layouts/Month.vue";
import { AppDate } from "@/types";

// define types
interface Layouts {
  [key: string]: any;
}

// define constants
const layouts: Layouts = {
  day: DayLayout,
  week: WeekLayout,
  month: MonthLayout,
};

// define refs
const currentLayout = ref("month");

const dates = ref<AppDate>([]);

const todayDate = new Date();

const currentDate = ref(todayDate);

const currentYear = ref(todayDate.getFullYear());

const currentMonth = ref(todayDate.getMonth());

const startDate = ref();

const endDate = ref();

const getDays = (month: number, year: number, date = 1) => {
  dates.value = [];
  currentMonth.value = month;
  currentYear.value = year;
  currentDate.value = new Date(year, month, date);

  if (currentLayout.value === "month") {
    dates.value = calendarGetters.getDaysInMonth(month, year);
  } else if (currentLayout.value === "week") {
    dates.value = calendarGetters.getDaysInWeek(month, year, date);
  } else {
    startDate.value = currentDate.value.toISOString().split("T")[0];
    endDate.value = currentDate.value.toISOString().split("T")[0];
  }
};

const handleLayoutchange = (newLayout: string) => {
  currentLayout.value = newLayout;
  // getInitialCalendarDates();
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

watch(currentLayout, (newLayout: string) => {
  getDays(currentMonth.value, currentYear.value);
});
</script>
<style scoped></style>
