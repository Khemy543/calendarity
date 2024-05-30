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
      :key="day.date"
      class="calendar__grid__item day"
      :class="{ today: isTodayDate(day.date) }"
    >
      <div class="w-full h-full relative">
        <p>{{ day.day }}</p>
      </div>
      <!-- <v-menu
        :close-on-content-click="false"
        :model-value="day.showModal"
        @update:model-value="toggleCreateEventModal(index)"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="w-full h-full relative">
            <P :gray="!day.isCurrentMonth" medium>{{ day.day }}</P>
          </div>
        </template>
        <CreateEvent
                        @close="toggleCreateEventModal(index)"
                        :is-edit="isEdit"
                        :date="day.date"
                    />
      </v-menu> -->

      <!-- <EventList
                    :data="getEvents(day)"
                    :index="index + 1"
                    @set-date="emit('set-date', day.date)"
                    @edit="toggleCreateEventModal(index, true)"
                /> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { calendarGetters } from "@/composables";
/* import EventList from "../EventList.vue";
import CreateEvent from "../CreateEvent.vue"; */

const props = defineProps({
  layout: {
    type: String,
    default: "month",
  },
  dates: {
    type: Array,
    default: () => [],
  },
  events: {
    type: Array,
    default: () => [],
  },
});

const isEdit = ref(false);

const emit = defineEmits(["set-date", "toggle-modal"]);

const getEvents = (day) => {
  const date = day.date.getDate();
  const year = day.date.getFullYear();
  const month = day.date.getMonth();
  const events = props.events.filter((event) => {
    const startDate = new Date(event.start_date);
    return (
      startDate.getFullYear() === year &&
      startDate.getMonth() === month &&
      startDate.getDate() === date /* &&
            new Date(event.end_time).getFullYear() === year &&
            new Date(event.end_time).getMonth() === month &&
            new Date(event.end_time).getDate() >= date */
    );
  });
  return {
    events: events.length > 2 ? events.slice(0, 2) : events,
    remaining: events.length > 2 ? events.length - 2 : 0,
  };
};

const isTodayDate = (date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const toggleCreateEventModal = (index, edit = false) => {
  isEdit.value = edit;
  emit("toggle-modal", index);
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
