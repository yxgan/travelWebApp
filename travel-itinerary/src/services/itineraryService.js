const STORAGE_KEY = 'itineraries';

export const saveItinerary = (itinerary) => {
    const existingItineraries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newItinerary = {
        ...itinerary,
        id: Date.now(),
        createdAt: new Date().toISOString()
    };
    const updatedItineraries = [...existingItineraries, newItinerary];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItineraries));
    return newItinerary;
};

export const getItineraries = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};