import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../css/Map.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMaximize } from '@fortawesome/free-solid-svg-icons';

function FilterList({ filters, handleCheckboxChange }) {
  return (
    <div className="category-list">
      {filters.map((filter) => (
        <label key={filter.key}>
          {filter.label}
          <input
            type="checkbox"
            checked={filter.checked}
            onChange={() => handleCheckboxChange(filter.key)}
          />
        </label>
      ))}
    </div>
  );
}

function MapWithMarkers() {
  const [pageData, setPageData] = useState(null);
  const [categoriesFilter, setCategoriesFilter] = useState({
    scene: false,
    toilette: false,
    camping: false,
    parking: false,
    stand: false,
    plage: false,
    piscine: false,
    entree: true,
  });

  
  
  const [isListVisible, setListVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleToggleList = () => {
    setListVisible(!isListVisible);
  };

  const maximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleCheckboxChange = (category) => {
    setCategoriesFilter(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://site-formation.local/wp-json/wp/v2/pages/32');
        const data = await response.json();

        setPageData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  // Parse les données acf de l'api
  const entree = pageData.acf.entree.field;
  const scene = pageData.acf.sceneprincipal.field;
  const scene2 = pageData.acf.scene2.field;
  const scene3 = pageData.acf.scene3.field;
  const scene4 = pageData.acf.scene4.field;
  const scene5 = pageData.acf.scene5.field;
  const toilette1 = pageData.acf.toilette1.field;
  const toilette2 = pageData.acf.toilette2.field;
  const camping = pageData.acf.camping.field;
  const parking = pageData.acf.parking.field;
  const stand1 = pageData.acf.stand1.field;
  const stand2 = pageData.acf.stand2.field;
  const plage = pageData.acf.plage.field;
  const piscine = pageData.acf.piscine.field;

  function convertCoords(center) {
    return {
      lat: parseFloat(center.center_lat),
      lng: parseFloat(center.center_lng)
    };
  }

  const entreeCoords = convertCoords(entree);
  const sceneCoords = convertCoords(scene);
  const scene2Coords = convertCoords(scene2);
  const scene3Coords = convertCoords(scene3);
  const scene4Coords = convertCoords(scene4);
  const scene5Coords = convertCoords(scene5);
  const toilette1Coords = convertCoords(toilette1);
  const toilette2Coords = convertCoords(toilette2);
  const campingCoords = convertCoords(camping);
  const parkingCoords = convertCoords(parking);
  const stand1Coords = convertCoords(stand1);
  const stand2Coords = convertCoords(stand2);
  const plageCoords = convertCoords(plage);
  const piscineCoords = convertCoords(piscine);

  const icons = {
    grey: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    red: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    blue: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    green: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    yellow: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    orange: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
  };


  // Tableau d'objets représentant les filtres
  const filters = [
    { key: 'scene', label: 'Scènes', checked: categoriesFilter.scene },
    { key: 'toilette', label: 'Toilettes', checked: categoriesFilter.toilette },
    { key: 'camping', label: 'Camping', checked: categoriesFilter.camping },
    { key: 'parking', label: 'Parking', checked: categoriesFilter.parking },
    { key: 'stand', label: 'lieux de restauration', checked: categoriesFilter.stand },
    { key: 'plage', label: 'Plage', checked: categoriesFilter.plage },
    { key: 'piscine', label: 'Piscine', checked: categoriesFilter.piscine },
    { key: 'entree', label: 'Entrée', checked: categoriesFilter.entree },
  ]; 
  
  return (
    <div className={isMaximized ? 'map-maximized' : 'filter-container'}>
      <MapContainer
        center={[48.75122317184923, 2.892097234725952]}
        zoom={15.5}
        style={{ height: isMaximized ? "100vh" : "50vh", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className='filter-marker'>
          <p className='title-filter' onClick={handleToggleList}>Personnaliser la vue</p>
          <button className='maximize-map'> 
            <FontAwesomeIcon icon={faMaximize} onClick={maximize}/>
          </button>
          {isListVisible && (
            <FilterList
              filters={filters}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </div> 
        {categoriesFilter.entree && (
          <Marker position={[entreeCoords.lat, entreeCoords.lng]} icon={icons.grey}>
            <Popup>
              {entree.instructions}<br></br>
              <Link to="/entree">En savoir plus</Link>
            </Popup>
          </Marker>
        )}

        {categoriesFilter.scene && (
          <>
            <Marker position={[sceneCoords.lat, sceneCoords.lng]} icon={icons.red}>
              <Popup>
                {scene.instructions}<br></br>
                <Link to="/scene/1">En savoir plus</Link>
              </Popup>
            </Marker>

            <Marker position={[scene2Coords.lat, scene2Coords.lng]} icon={icons.red}>
              <Popup>
                {scene2.instructions}<br></br>
                <Link to="/scene/2">En savoir plus</Link>
              </Popup>
            </Marker>

            <Marker position={[scene3Coords.lat, scene3Coords.lng]} icon={icons.red}>
              <Popup>
                {scene3.instructions}<br></br>
                <Link to="/scene/3">En savoir plus</Link>
              </Popup>
            </Marker>

            <Marker position={[scene4Coords.lat, scene4Coords.lng]} icon={icons.red}>
              <Popup>
                {scene4.instructions}<br></br>
                <Link to="/scene/4">En savoir plus</Link>
              </Popup>
            </Marker>

            <Marker position={[scene5Coords.lat, scene5Coords.lng]} icon={icons.red}>
              <Popup>
                {scene5.instructions}<br></br>
                <Link to="/scene/5">En savoir plus</Link>
              </Popup>
            </Marker>
          </>
        )}

        {categoriesFilter.toilette && (
          <>
            <Marker position={[toilette1Coords.lat, toilette1Coords.lng]} icon={icons.blue}>
              <Popup>
                {toilette1.instructions}
              </Popup>
            </Marker>

            <Marker position={[toilette2Coords.lat, toilette2Coords.lng]} icon={icons.blue}>
              <Popup>
                {toilette2.instructions}
              </Popup>
            </Marker>
          </>
        )}

        {categoriesFilter.camping && (
          <Marker position={[campingCoords.lat, campingCoords.lng]} icon={icons.orange}>
            <Popup>
              {camping.instructions}
            </Popup>
          </Marker>
        )}

        {categoriesFilter.parking && (
          <Marker position={[parkingCoords.lat, parkingCoords.lng]} icon={icons.orange}>
            <Popup>
              {parking.instructions}
            </Popup>
          </Marker>
        )}

        {categoriesFilter.stand && (
          <>
            <Marker position={[stand1Coords.lat, stand1Coords.lng]} icon={icons.green}>
              <Popup>
                {stand1.instructions}<br></br>
                <Link to="/stand/1">En savoir plus</Link>
              </Popup>
            </Marker>

            <Marker position={[stand2Coords.lat, stand2Coords.lng]} icon={icons.green}>
              <Popup>
                {stand2.instructions}<br></br>
                <Link to="/stand/2">En savoir plus</Link>
              </Popup>
            </Marker>
          </>
        )}

        {categoriesFilter.plage && (
          <Marker position={[plageCoords.lat, plageCoords.lng]} icon={icons.yellow}>
            <Popup>
              {plage.instructions}
            </Popup>
          </Marker>
        )}

        {categoriesFilter.piscine && (
          <Marker position={[piscineCoords.lat, piscineCoords.lng]} icon={icons.yellow}>
            <Popup>
              {piscine.instructions}
            </Popup>
          </Marker>
        )}
      </MapContainer> 
    </div>
  );
}

export default MapWithMarkers;
