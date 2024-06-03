<template>
  <div class="header">
    <div class="header__layouts">
      <button
        v-for="layout in calendarGetters.layouts"
        class="header__button"
        :class="{ active: layout == activeLayout }"
        :key="layout"
        @click="emit('change-layout', layout)"
      >
        <h5>{{ layout }}</h5>
      </button>
    </div>

    <h1 class="header__current-date">{{ monthString }} {{ year }}</h1>

    <div class="header__layouts">
      <button class="header__button" @click="getMonthOrWeekOrDay(-1)">
        <Icon name="chevron-left" class="icon" />
      </button>
      <button class="header__button" @click="getMonthOrWeekOrDay()">
        <h5>Today</h5>
      </button>
      <button class="header__button" @click="getMonthOrWeekOrDay(+1)">
        <Icon name="chevron-right" class="icon" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Icon from "@/components/Dynamic/Icon.vue";
import { calendarGetters } from "@/composables";
import { type LayoutTypes } from "@/types";

interface Props {
  year?: number;
  month?: number;
  activeLayout?: LayoutTypes
  currentDate?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  activeLayout: "month",
  currentDate: () => new Date(),
});

const emit = defineEmits(["change-layout", "change"]);

const monthString = computed(() => calendarGetters.months[props.month]);

const getMonthOrWeekOrDay = (direction = 0, newDate = null) => {
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
      newDate || props.currentDate
    );

    emit("change", {
      month,
      year,
      date,
    });
  }
};
</script>
<style lang="scss" scoped>
@import url("./CalendarHeader.scss");
</style>
