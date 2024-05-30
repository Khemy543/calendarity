<template>
  <div class="calendar-header">
    <div class="calendar-header__layouts">
      <button
        v-for="layout in calendarGetters.layouts"
        class="layout"
        :class="{ active: layout == activeLayout }"
        :key="layout"
        @click="emit('change-layout', layout)"
      >
        <Icon :name="layout" class="icon" />
      </button>
    </div>

    <h1 class="calendar-header__current-date">{{ monthString }} {{ year }}</h1>

    <div class="calendar-header__layouts">
      <button class="layout" @click="getMonthOrWeekOrDay(-1)">
        <Icon name="chevron-left" class="icon"/>
      </button>
      <button class="layout">
        <h5>Today</h5>
      </button>
      <button class="layout" @click="getMonthOrWeekOrDay(+1)">
        <Icon name="chevron-right" class="icon" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { calendarGetters } from "@/composables";

const props = defineProps({
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  month: {
    type: Number,
    default: new Date().getMonth(),
  },
  activeLayout: {
    type: String,
    default: "month",
  },
  currentDate: {
    type: Date,
    default: new Date(),
  },
});

const emit = defineEmits(["change-layout"]);

const monthString = computed(() => calendarGetters.months[props.month]);

const authStore = computed(() => window.store.auth);

const getMonthOrWeekOrDay = (direction = null, newDate = null) => {
  if (props.activeLayout === "month") {
    const { month, year } = calendarGetters.getNextPrevMonth(
      direction,
      props.month,
      props.year
    );
    emit("change", {
      month,
      year,
    });
  } else if (props.activeLayout === "week") {
    const { month, year, date } = calendarGetters.getNextPrevWeek(
      direction,
      props.month,
      props.year,
      newDate || props.currentDate
    );

    emit("change", {
      month,
      year,
      date,
    });
  } else {
    const { month, year, date } = calendarGetters.getNextPrevDay(
      direction,
      props.month,
      props.year,
      newDate || props.currentDate
    );

    emit("change", {
      month,
      year,
      date,
    });
  }
};

const closeCalendar = () => {
  authStore.value.showCalendar = false;
};
</script>
<style lang="scss" scoped>
@import url("./CalendarHeader.scss");
</style>
