import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';

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
                <Marker
                    position={[51.505, -0.09]}
                    icon={leaflet.icon({
                        iconSize: [58, 68],
                        iconAnchor: [29, 68],
                        popupAnchor: [170, 2],
                        iconUrl: Assets.mapMarker,
                    })}
                >
                    <Popup
                        minWidth={240}
                        maxWidth={240}
                        closeButton={false}
                        className="map-popup"
                    >
                        Lar de teste
                        <Link to="/orphanages/1">
                            <FiArrowRight size={'2.5rem'} color="var(--text-color)" />
                        </Link>
                    </Popup>
                </Marker>
            </MapContainer>

            <Link to="/orphanages-create" className="create-orphanage color-blue display-flex flex-content-center flex-items-center z2">
                <FiPlus size={'2.5rem'} color="var(--text-color)" />
            </Link>
        </div>
    );
}
