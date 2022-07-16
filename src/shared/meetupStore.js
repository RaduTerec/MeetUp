import { writable } from "svelte/store";

const meetupStore = writable([]);

const customMeetupStore = {
   subscribe: meetupStore.subscribe,		// proxy the subscribe method
   setMeetups: (meetupArray) => {
      meetupStore.set(meetupArray);
   },
   create: meetupData => {
      const newMeetup = {
         ...meetupData
      };

      meetupStore.update(items => {
         return [newMeetup, ...items];
      });
   },
   update: (id, meetupData) => {
      meetupStore.update(items => {
         const itemIndex = items.findIndex(i => i.id === id);
         const updatedItem = { ...items[itemIndex], ...meetupData }; // merge the key-value pairs of itemData with those of items[itemIndex]
         const updatedItems = [...items];
         updatedItems[itemIndex] = updatedItem;
         return updatedItems;
      });
   },
   remove: id => {			          // remove item from the meetups
      meetupStore.update(items => {
         return items.filter(i => i.id !== id);
      });
   },
   toggleFavorite: id => {
      meetupStore.update(items => {
         const meetupToUpdate = { ...items.find(i => i.id === id) };
         meetupToUpdate.isFavorite = !meetupToUpdate.isFavorite;

         const meetupIndex = items.findIndex(i => i.id === id);
         const updatedMeetups = [...items];
         updatedMeetups[meetupIndex] = meetupToUpdate;
         return updatedMeetups;
      })
   }
};

export default customMeetupStore;