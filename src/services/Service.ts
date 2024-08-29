import axios from 'axios';
import type { Event, Country } from '@/type';

const apiClient = axios.create({
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

export default {
  async getAllEvents(): Promise<Event[]> {
    const parts = [
      'countrymedal/data1',
      'data2/data2',
      'data3/data3',
      'data4/data4',
      'data5/data5',
    ];

    const dataPromises = parts.map((part) =>
      apiClient
        .get(`https://my-json-server.typicode.com/Jasmxnej/${part}`)
        .then((response) => response.data as Event[])
    );
    const results = await Promise.all(dataPromises);

    return results.flat();
  }
};
