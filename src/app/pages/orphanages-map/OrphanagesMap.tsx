import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

import { Assets } from '../../assets';
import './OrphanagesMap.css';

export const OrphanagesMapPage: React.FC = () => {
    return (
        <div className="page-map full-width full-height position-relative">
            <aside className="display-flex flex-column flex-space-between">
                <header>
                    <img src={Assets.mapMarker} alt="" />

                    <h2 className="font-weight-xg">Escolha um orfanato no mapa</h2>
                    <p>Muitas criação estão sperando por sua visita :)</p>
                </header>

                <footer className="display-flex flex-column">
                    <strong className="font-weight-xg">Campo bom</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            </aside>

            <MapContainer
                zoom={13}
                center={[51.505, -0.09]}
                className="full-height full-width z1"
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>

            <Link to="/app" className="create-orphanage color-blue display-flex flex-content-center flex-items-center z2">
                <FiPlus size={'2.5rem'} color="rgba(0, 0, 0, 0.6)" />
            </Link>
        </div>
    );
}
