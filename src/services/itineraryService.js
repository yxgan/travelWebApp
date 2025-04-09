import { ref, get, set, remove, push, child } from 'firebase/database';
import { db } from '../firebase/config';

export const saveItinerary = async (itinerary) => {
    try {
        if (itinerary.id) {
            // Update existing itinerary
            await set(ref(db, `itineraries/${itinerary.id}`), itinerary);
            return itinerary;
        } else {
            // Create new itinerary
            const newItineraryRef = push(ref(db, 'itineraries'));
            const newItinerary = {
                ...itinerary,
                id: newItineraryRef.key,
                createdAt: new Date().toISOString()
            };
            await set(newItineraryRef, newItinerary);
            return newItinerary;
        }
    } catch (error) {
        console.error('Error saving itinerary:', error);
        throw error;
    }
};

export const getItineraries = async () => {
    try {
        const snapshot = await get(ref(db, 'itineraries'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.values(data);
        }
        return [];
    } catch (error) {
        console.error('Error fetching itineraries:', error);
        throw error;
    }
};

export const deleteItinerary = async (id) => {
    try {
        await remove(ref(db, `itineraries/${id}`));
    } catch (error) {
        console.error('Error deleting itinerary:', error);
        throw error;
    }
};

export const getItineraryById = async (id) => {
    try {
        const snapshot = await get(child(ref(db), `itineraries/${id}`));
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return null;
    } catch (error) {
        console.error('Error fetching itinerary:', error);
        throw error;
    }
};