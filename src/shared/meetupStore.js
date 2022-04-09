import { writable } from "svelte/store";

const meetupStore = writable([
  {
    id: "m1",
    title: "Coding Bootcamp",
    subtitle: "Learn to code in 2 hours",
    description:
      "In this meetup, we will have some experts that teach you how to code!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
    address: "27th Nerd Road, 32523 New York",
    contactEmail: "code@test.com",
    isFavorite: false,
  },
  {
    id: "m2",
    title: "Swim Together",
    subtitle: "Let's go for some swimming",
    description: "We will simply swim some rounds!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
    address: "27th Nerd Road, 32523 New York",
    contactEmail: "swim@test.com",
    isFavorite: false,
  }
]);

const customMeetupStore = {
  subscribe: meetupStore.subscribe,		// proxy the subscribe method
  create: meetupData => {
    const newMeetup = {
      ...meetupData,
      id: Math.random(),
      isFavorite: false,
    }

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