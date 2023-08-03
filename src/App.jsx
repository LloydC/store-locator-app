import { useState, useCallback } from 'react';
import Map, {Marker} from 'react-map-gl';
import * as turf from '@turf/turf';
import './App.css'

// A circle of 5 mile radius of the Empire State Building
const GEOFENCE = turf.circle([4.90, 52.36], 5, {units: 'miles'});

function App() {
  const [viewState, setViewState] = useState({
    longitude: 4.90,
    latitude: 52.36,
    zoom: 11
  });

  const onMove = useCallback(({viewState}) => {
    const newCenter = [viewState.longitude, viewState.latitude];
    // Only update the view state if the center is inside the geofence
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState(newCenter);
    }
  }, [])

  return (
    <Map
    {...viewState}
    mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
    onMove={onMove}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Marker longitude={4.90} latitude={52.36} color="red" />
  </Map>
  )
}

export default App
