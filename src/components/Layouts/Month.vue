<template>
  <div class="calendar__grid" :class="layout">
    <div
      class="calendar__grid__item"
      v-for="day in calendarGetters.days"
      :key="day"
    >
      <h4 class="font-semibold text-base">
        {{ day.substring(0, 3) }}
      </h4>
    </div>
  </div>

  <div class="calendar__grid" :class="layout">
    <div
      v-for="(day, index) in dates"
      :key="index"
      class="calendar__grid__item day"
      :class="{ today: isTodayDate(day.date) }"
    >
      <div class="w-full h-full relative">
        <p>{{ day.day }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { calendarGetters } from "@/composables";
import type { AppDate } from "@/types";

interface Props {
  layout: string;
  dates: AppDate[];
  currentDate: Date;
}

withDefaults(defineProps<Props>(), {
  layout: "month",
  dates: () => [],
  currentDate: () => new Date(),
});

const emit = defineEmits(["set-date", "toggle-modal"]);

const isTodayDate = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};
</script>

<style lang="scss" scoped>
.calendar {
  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    &.bordered {
      border-top: 1px solid $gray-L2;
    }

    &__item {
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;

      &.day {
        height: 130px;
        display: block;
        position: relative;
        border-top: 1px solid $gray-L2;
        border-right: 1px solid $gray-L2;

        & p {
          position: absolute;
          top: 16px;
          right: 16px;
        }
      }

      &.today {
        background-color: $gray-L2;
      }
    }
  }
}
</style>
