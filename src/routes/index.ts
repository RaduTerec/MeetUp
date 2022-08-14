import type { RequestHandler } from './__types';
import type { Meetup } from '$lib/shared/meetup.type';

export const GET: RequestHandler = async () => {
   const url = `https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup.json`;
   const response = await fetch(url);

   if (response.status === 404) {
      return {
         status: 404,
         body: {
            fetchedMeetups: []
         }
      };
   }

   if (response.status === 200) {
      const data = await response.json();

      const fetchedMeetups: Meetup[] = [];
      for (const key in data) {
         fetchedMeetups.push({
            ...data[key],
            id: key
         });
      }

      return {
         body: {
            fetchedMeetups: fetchedMeetups
         }
      };
   }

   return {
      status: response.status
   };
}