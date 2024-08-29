import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Event } from '@/type';
import EventService from '@/services/Service'; 

export const useEventStore = defineStore('event', () => {
  const events = ref<Event[]>([]);
  const currentEvent = ref<Event | null>(null);
  const paginatedEvents = ref<Event[]>([]);

  async function fetchAllEvents() {
    try {
      const response = await EventService.getAllEvents(); 
      if (Array.isArray(response)) {
        events.value = response;
      } else {
        console.error('Expected an array but got:', response);
        events.value = []; 
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      events.value = []; 
    }
  }

  return {
    events,
    currentEvent,
    paginatedEvents,
    fetchAllEvents, 
  };
});
