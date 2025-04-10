import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItineraryList from './pages/ItineraryList';
import CreateItinerary from './pages/CreateItinerary';
import ViewItinerary from './components/ViewItinerary';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/travelWebApp">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itineraries" element={<ItineraryList />} />
          <Route path="/create" element={<CreateItinerary />} />
          <Route path="/itinerary/:id" element={<ViewItinerary />} />
          <Route path="/edit/:id" element={<CreateItinerary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;