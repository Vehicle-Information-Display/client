import { writable, derived } from 'svelte/store';

// Event Cache Inter-Component Store
const eventCache = writable([]);
export const globalEventCache = {
    subscribe: eventCache.subscribe,
    addMessage: message => {
        eventCache.update(existingItems => {
            return [...existingItems, message]
        });
    }
};