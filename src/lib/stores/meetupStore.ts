import { writable } from "svelte/store";
import type { Meetup } from './../shared/meetup.type';

const meetupStore = writable<Meetup[]>();

const customMeetupStore = {
   subscribe: meetupStore.subscribe,		// proxy the subscribe method
   setMeetups: (meetupArray: Meetup[]) => {
      meetupStore.set(meetupArray);
   },
   create: (meetupData: Meetup) => {
      meetupStore.update(items => {
         return [meetupData, ...items];
      });
   },
   update: (id: string, meetupData: Meetup) => {
      meetupStore.update(items => {
         const itemIndex = items.findIndex(i => i.id === id);
         const updatedItem = { ...items[itemIndex], ...meetupData }; // merge the key-value pairs of itemData with those of items[itemIndex]
         const updatedItems = [...items];
         updatedItems[itemIndex] = updatedItem;
         return updatedItems;
      });
   },
   remove: (id: string) => {			          // remove item from the meetups
      meetupStore.update(items => {
         return items.filter(i => i.id !== id);
      });
   },
   toggleFavorite: (id: string) => {
      meetupStore.update(items => {
         const meetupIndex = items.findIndex(i => i.id === id);
         items[meetupIndex].isFavorite = items[meetupIndex].isFavorite;
         const newitems = items;
         return newitems;
      })
   }
};

export default customMeetupStore;