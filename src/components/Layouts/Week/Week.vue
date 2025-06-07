<template>
  <div class="week" id="week">
    <div class="week__days">
      <div class="week__days__item"></div>
      <div
        class="week__days__item"
        v-for="(day, index) in calendarGetters.days"
        :key="index"
      >
        <div>
          <p>
            {{ day.substring(0, 3) }}
          </p>
          <h4>
            {{ dates[index].day || 0 }}
          </h4>
        </div>
      </div>
    </div>
    <div class="week__body">
      <div class="week__time">
        <div
          v-for="time in calendarGetters.dayTimes()"
          :key="time"
          class="time"
        >
          <p>{{ time }}</p>
        </div>
      </div>
      <div class="week__time__slots">
        <div
          v-for="(slot, index) in getAllWeekTimeSlots"
          :key="index"
          class="slot"
          :class="{ today: calendarGetters.isTodayDate(slot.date) }"
        >
          <EventList :events="getEvents(slot.time, slot.date)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { calendarGetters } from "@/composables";
import { formateDate } from "@/helpers/dates";
import { AppDate, CalendarEvent } from "@/types";
import EventList from "@/components/Dynamic/EventList.vue";

interface Props {
  dates: AppDate[];
  currentDate: Date;
  events: CalendarEvent[];
}

const props = withDefaults(defineProps<Props>(), {
  dates: () => [],
  currentDate: () => new Date(),
  events: () => [],
});

const emit = defineEmits(["set-date", "toggle-modal"]);

const getAllWeekTimeSlots = computed(() => {
  const combinations = [];
  for (const time of calendarGetters.dayTimes()) {
    for (const day of props.dates) {
      combinations.push({
        time,
        date: day.date,
      });
    }
  }
  return combinations;
});

const getEvents = (time: string, date: Date) => {
  const slot = getAllWeekTimeSlots.value[date.getDay()];
  console.log(time);
  /* const current = new Date(
    slot.date.getFullYear(),
    slot.date.getMonth(),
    slot.date.getDay(),
    hours,
    minutes,
    0,
    0
  ); */
  /*   return props.appointments
        .filter((appointment) => {
            const start = new Date(appointment.start_time);
            return (
                current.getDate() === start.getDate() &&
                current.getHours() === start.getHours()
            );
        })
        .map((appointment) => ({
            ...appointment,
            height: getEventHeight(
                appointment.start_time,
                appointment.end_time
            ),
            top: getEventTopSpace(appointment.start_time),
        })); */
  return [];
};
</script>
<style lang="scss" scoped>
@import url("./Week.scss");
</style>
