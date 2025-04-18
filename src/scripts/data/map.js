import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import * as maptilersdk from '@maptiler/client';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

const API_KEY = process.env.MAP_SERVICE_API_KEY;
maptilersdk.config.apiKey = API_KEY;

const streetsLayer = new MaptilerLayer({
  apiKey: API_KEY,
  style: "streets-v2", 
});

const satelliteLayer = new MaptilerLayer({
  apiKey: API_KEY,
  style: "satellite",
});

export const createMap = (containerId, initialLatLng = [-2.548926, 118.0148634], zoomLevel = 13) => {
  const map = L.map(containerId, {
    center: initialLatLng,
    zoom: zoomLevel,
    layers: [streetsLayer],
  });

  L.control.layers(
    {
      Streets: streetsLayer,
      Satellite: satelliteLayer,
    }
  ).addTo(map);

  return map;
};

export function addMark (map, initialLatLng) {
  L.marker(initialLatLng).addTo(map);
}

export async function reverseGeocode(lat, lon) {
  try {
    const results = await maptilersdk.geocoding.reverse([lon, lat]);
    const address = results.features[0]?.place_name || 'Alamat tidak ditemukan';

    // Take only city and country
    const addressParts = address.split(',').map(part => part.trim());
    const shortAddress = addressParts.slice(-2).join(', ');

    return shortAddress;
  } catch (error) {
    return 'Gagal mengambil alamat';
  }
}