import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import leaflet from 'leaflet';

import { IOrphanage, OrphanagesService } from '../../services';
import { Assets } from '../../assets';
import './OrphanagesMap.css';

export const OrphanagesMapPage: React.FC = () => {
    const [orphanages, setOrphanages] = useState<IOrphanage[]>();

    useEffect(() => {
        OrphanagesService.getAllOrphanages().then(data => {
            if (data) {
                setOrphanages(data);
            } else {
                alert('Falha ao carregar as localizações!');
            }
        });
    }, []);

    const happyMapIcon = useMemo(() => leaflet.icon({
        iconUrl: Assets.mapMarker,
        popupAnchor: [170, 2],
        iconAnchor: [29, 68],
        iconSize: [58, 68],
    }), []);

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

            {!orphanages && <p style={{ position: 'fixed' }}>Buscando localizações...</p>}

            <MapContainer
                zoom={5}
                center={[-14.2376354, -60.3400319]}
                className="full-height full-width z1"
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {orphanages?.map((orphanage, index) => (
                    <Marker key={index} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]}>
                        <Popup minWidth={240} maxWidth={240} closeButton={false} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={'2.5rem'} color="var(--text-color)" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <Link to="/orphanages-create" className="create-orphanage color-blue display-flex flex-content-center flex-items-center z2">
                <FiPlus size={'2.5rem'} color="var(--text-color)" />
            </Link>
        </div>
    );
}
