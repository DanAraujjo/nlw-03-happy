import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'

import '../styles/pages/orphananges-map.css';


import marker from '../images/marker.svg'

function OrphanagesMap() {
  return (
  <div id="page-map">
    <aside>
      <header>
        <img src={marker} alt="Happy"/>

        <h2>Escolha um orfanto no mapa</h2>
        <p>Muitas crianças estão esperando a sua visita!</p>
      </header>

      <footer>
        <strong>Fortaleza</strong>
        <span>Ceará</span>
      </footer>
    </aside>

    <Map
    center={[-3.7722138,-38.5795396]}
    zoom={15}
    style={{width: '100%', height: '100%'}}
    >
     
    
    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
    
    </Map>

    <Link to="" className="create-orphanage">
      <FiPlus size={32} color="#fff" />
    </Link>
  </div>
  )
}

export default OrphanagesMap;