<template>
  <div class="event-list">
    <div class="event-list__item" v-for="event in events" :key="event.id">
      <h4>{{ event.title }}</h4>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CalendarEvent } from "@/types";
interface Props {
  events: CalendarEvent[];
}

withDefaults(defineProps<Props>(), {
  events: () => [],
});
</script>
<style lang="scss" scoped>
.event-list {
    padding-top: 30px;
    &__item {
        border-left-width: 3px;
        border-left-color: $color-success;
        border-radius: 4px;
        padding: 0 3px;
        margin: 2px 2px 6px 2px;
        border-left-style: solid;
        position: relative;
        background: $color-primary;
        cursor: pointer;
        text-align: center;
        h4 {
            font-size: 12px;
            color: white;
        }
    }
}
</style>
