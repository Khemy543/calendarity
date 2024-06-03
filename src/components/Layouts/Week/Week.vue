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
          <p class="font-semibold text-sm">
            {{ day.substring(0, 3) }}
          </p>
          <h4 class="font-semibold text-2xl">
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
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { calendarGetters } from "@/composables";
import { AppDate } from "@/types";

interface Props {
  dates: AppDate[];
  currentDate: Date;
}

const props = withDefaults(defineProps<Props>(), {
  dates: () => [],
  currentDate: () => new Date(),
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
</script>
<style lang="scss" scoped>
@import url("./Week.scss");
</style>
