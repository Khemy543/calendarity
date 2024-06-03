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
      :class="{ today: calendarGetters.isTodayDate(day.date) }"
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
</script>

<style lang="scss" scoped>
@import url("./Month.scss");
</style>
