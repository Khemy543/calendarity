<template>
  <div class="week">
    <div class="week__days">
      <div class="week__days__item" style="width: 100px; border: none"></div>
      <div class="week__days__item">
        <div>
          <p class="font-semibold text-sm">
            {{ calendarGetters.getDayString(currentDate).substring(0, 3) }}
          </p>
          <h4 class="font-semibold text-2xl">
            {{ currentDate.getDate() }}
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
          v-for="time in calendarGetters.dayTimes()"
          :key="time"
          class="slot"
          style="position: relative"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { calendarGetters } from "@/composables";
import type { AppDate } from "@/types";

interface Props {
  dates: AppDate[];
  currentDate: Date;
}

withDefaults(defineProps<Props>(), {
  dates: () => [],
  currentDate: () =>new Date(),
});

const emit = defineEmits(["set-date", "toggle-modal"]);
</script>
<style lang="scss" scoped>
@import url("./Day.scss");
</style>
