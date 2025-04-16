import L from 'leaflet';

const streetsLayer = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_API_KEY', {
  attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>',
  maxZoom: 19,
});

const satelliteLayer = L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=YOUR_API_KEY', {
  attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>',
  maxZoom: 19,
});

export const createMap = (containerId, initialLatLng = [51.505, -0.09], zoomLevel = 13) => {
  const map = L.map(containerId, {
    center: initialLatLng,
    zoom: zoomLevel,
    layers: [streetsLayer], 
  });

  L.control.layers({
    'Streets': streetsLayer,
    'Satellite': satelliteLayer,
  }).addTo(map);

  return map;
};