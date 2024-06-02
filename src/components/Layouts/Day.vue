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
.week {
  position: relative;
  &__days {
    display: flex;
    &__item {
      display: flex;
      align-items: center;
      height: 70px;
      padding: 0 32px;
      border-left: 1px solid $gray-L2;
      width: 100%;
    }
  }
  &__body {
    display: flex;
  }

  &__time {
    display: flex;
    flex-direction: column;
    width: 99px;
    text-align: right;
    padding: 0 30px;

    &__slots {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      width: 100%;
      background-color: $gray-L2;
      padding: 1px;
      row-gap: 1px;

      .slot {
        background-color: $white;
        height: 56px;
        display: block;
        padding: 2px;
      }
    }
    .time {
      height: 57px;
    }
  }
}
</style>
