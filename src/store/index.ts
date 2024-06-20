import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
      count: 0,
      events: [
        {
          title: "BCH237",
          start: "2024-06-12T10:30:00",
          end: "2024-06-12T11:30:00",
          description: "Lecture",
        }
      ],
    }),
  actions: {},
});
