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
          v-for="(slot, index) in timeSlots"
          :key="slot.time + index"
          class="slot"
          style="position: relative"
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
}

withDefaults(defineProps<Props>(), {
  dates: () => [],
});

const emit = defineEmits(["set-date", "toggle-modal"]);

const timeSlots = computed(() => calendarGetters.getAllTimeSlots.value || []);
</script>
<style lang="scss" scoped>
.week {
  position: relative;
  &__days {
    display: grid;
    grid-template-columns: repeat(8, auto);
    border-bottom: 1px solid $gray-L2;

    &__item {
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
  &__body {
    display: flex;
  }

  &__time {
    display: flex;
    flex-direction: column;
    width: 100px;
    text-align: right;
    padding-right: 9px;

    &__slots {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      width: 100%;
      background-color: $gray-L2;
      padding-left: 1px;
      column-gap: 1px;

      .slot {
        background-color: $white;
        height: 56px;
        display: block;
      }
    }
    .time {
      height: 57px;
    }
  }
}
</style>
