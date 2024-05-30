<template>
  <CalendarHeader />
  <Component :is="layouts[currentLayout]" :dates="dates" @change-layout=""/>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { calendarGetters } from "@/composables";
import CalendarHeader from "@/components/CalendarHeader/CalendarHeader.vue";
import DayLayout from "@/components/Layouts/Day.vue";
import WeekLayout from "@/components/Layouts/Week.vue";
import MonthLayout from "@/components/Layouts/Month.vue";

const currentLayout = ref("month");

const dates = ref([]);

const todayDate = new Date();

const currentDate = ref(todayDate);

const currentDateForAppointment = ref(todayDate.toISOString().split("T")[0]);

const currentYear = ref(todayDate.getFullYear());

const currentMonth = ref(todayDate.getMonth());

const startDate = ref();

const endDate = ref();

const layouts = {
  day: DayLayout,
  week: WeekLayout,
  month: MonthLayout,
};

const getDays = (month, year, date = 1) => {
  dates.value = [];
  currentMonth.value = month;
  currentYear.value = year;
  currentDate.value = new Date(year, month, date);

  //set current date for appointment fetching
  currentDateForAppointment.value = currentDate.value
    .toISOString()
    .split("T")[0];

  if (currentLayout.value === "month") {
    dates.value = calendarGetters.getDaysInMonth(month, year);
    startDate.value = dates.value[0].date.toISOString().split("T")[0];
    endDate.value = dates.value[dates.value.length - 1].date
      .toISOString()
      .split("T")[0];
  } else if (currentLayout.value === "week") {
    dates.value = calendarGetters.weekSevenDays.value;
    startDate.value = dates.value[0].toISOString().split("T")[0];
    endDate.value = dates.value[dates.value.length - 1]
      .toISOString()
      .split("T")[0];
  } else {
    startDate.value = currentDate.value.toISOString().split("T")[0];
    endDate.value = currentDate.value.toISOString().split("T")[0];
  }
};

const changeLayout = (newLayout) => {
    layout.value = newLayout;
    // getInitialCalendarDates();
};

onMounted(() => {
  getDays(todayDate.getMonth(), todayDate.getFullYear(), todayDate.getDate());
});

watch(currentLayout, (newLayout) => {
  getDays(currentMonth.value, currentYear.value);
});
</script>
<style scoped></style>
