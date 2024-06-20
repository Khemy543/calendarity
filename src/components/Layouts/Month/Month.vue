<template>
  <div class="calendar__grid" :class="layout">
    <div
      class="calendar__grid__item"
      v-for="day in calendarGetters.days"
      :key="day"
    >
      <h4 class=" ">
        {{ day.substring(0, 3) }}
      </h4>
    </div>
  </div>

  <div class="calendar__grid" :class="layout">
    <div
      v-for="(day, index) in dates"
      :key="index"
      class="calendar__grid__item day"
      :class="{ today: calendarGetters.isTodayDate(day.date) }"
    >
      <div class="w-full h-full relative">
        <p>{{ day.day }}</p>
      </div>
      <EventList :events="getEvents(day.date)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EventList from "@/components/Dynamic/EventList.vue";
import { calendarGetters } from "@/composables";
import type { AppDate, CalendarEvent } from "@/types";

interface Props {
  layout: string;
  dates: AppDate[];
  currentDate: Date;
  events: CalendarEvent[];
}

const props = withDefaults(defineProps<Props>(), {
  layout: "month",
  dates: () => [],
  currentDate: () => new Date(),
});

const emit = defineEmits(["set-date", "toggle-modal"]);

const getEvents = (date: Date) => {
  const vDate = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  return props.events.filter((event: CalendarEvent) => {
    return (
      new Date(event.start).getFullYear() === year &&
      new Date(event.start).getMonth() === month &&
      new Date(event.start).getDate() === vDate &&
      new Date(event.end).getFullYear() === year &&
      new Date(event.end).getMonth() === month &&
      new Date(event.end).getDate() >= vDate
    );
  });
};
</script>

<style lang="scss" scoped>
@import url("./Month.scss");
</style>
