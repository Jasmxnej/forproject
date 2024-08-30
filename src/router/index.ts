import { createRouter, createWebHistory } from 'vue-router';
import EventListView from '@/views/ListView.vue';
import LayoutView from '@/views/event/LayoutView.vue';
import CountryDetail from '@/views/event/CountryDetailView.vue';
import MedalDetail from '@/views/event/MedalView.vue';
import EventService from '@/services/Service';
import { useEventStore } from '@/stores/event';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') }),
    },
    {
      path: '/country/:id',
      name: 'layout-view',
      component: LayoutView,
      props: true,
      beforeEnter: async (to, from, next) => {
        const eventStore = useEventStore();
        const id = to.params.id as string;
        try {
          const event = await EventService.getEvent(id);
          if (event) {
            eventStore.setEvent(event);
            next();
          } else {
            next({ name: '404-resource-view', params: { resource: 'country' } });
          }
        } catch (error) {
          console.error('Error fetching country data:', error);
          next({ name: 'network-error-view', params: { resource: 'page' } });
        }
      },
      children: [
        {
          path: 'details',
          name: 'country-detail-view',
          component: CountryDetail,
          props: true,
        },
        {
          path: 'medals',
          name: 'medal-detail-view',
          component: MedalDetail,
          props: true,
        },
      ],
    }
  ],
});


export default router;
