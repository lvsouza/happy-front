import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FiClock, FiInfo } from "react-icons/fi";
import { useParams } from "react-router-dom";
import leaflet from 'leaflet';

import { IOrphanage, OrphanagesService } from "../../services";
import { Sidebar } from "../../components";
import { Assets } from "../../assets";
import './Orphanage.css';

export const Orphanage: React.FC = () => {
    const [imagePath, setImagePath] = useState<string>();
    const [orphanage, setOrphanage] = useState<IOrphanage>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        OrphanagesService.getOrphanagesById(Number(id)).then(data => {
            if (data) {
                setOrphanage(data);
                if (data.images.length > 0) {
                    setImagePath(data.images[0].path)
                }
            } else {
                alert('Falha ao carregar as localizações!');
            }
        });
    }, [id]);

    const happyMapIcon = useMemo(() => leaflet.icon({
        iconUrl: Assets.mapMarker,
        popupAnchor: [0, -60],
        iconAnchor: [29, 68],
        iconSize: [58, 68],
    }), []);

    if (!orphanage) {
        return (
            <p>Carregando...</p>
        );
    }

    return (
        <div id="page-orphanage" className="flex1">
            <Sidebar />

            <main className="flex1">
                <div className="orphanage-details flex-column">
                    <img src={imagePath} alt="" />

                    <div className="images">
                        {orphanage.images.map((image, index) => (
                            <button key={index} className={image.path === imagePath ? "active" : ""} type="button" onClick={() => setImagePath(image.path)}>
                                <img src={image.path} alt={image.id.toString()} />
                            </button>
                        ))}
                    </div>

                    <div className="orphanage-details-content flex-column">
                        <h1>{orphanage.name}</h1>
                        <p>{orphanage.about}</p>

                        <div className="map-container flex-column">
                            <MapContainer
                                zoom={15}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                                center={[orphanage.latitude, orphanage.longitude]}
                                style={{ width: '100%', height: 280 }}
                            >
                                <TileLayer url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`} />
                                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                            </MapContainer>

                            <footer>
                                <a
                                    target="_black"
                                    rel="noopener noreferrer"
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                                >
                                    Ver rotas no Google Maps
                                </a>
                            </footer>
                        </div>

                        <hr />

                        <h2>Instruções para visita</h2>
                        <p>{orphanage.instructions}</p>

                        <div className="open-details">
                            <div className="hour flex-column">
                                <FiClock size={32} color="#15B6D6" />
                                {orphanage.opening_hours}
                            </div>
                            {orphanage.open_on_weekends &&
                                <div className="open-on-weekends flex-column">
                                    <FiInfo size={32} color="#39CC83" />
                                    Atendemos <br />fim de semana
                                </div>
                            }
                            {!orphanage.open_on_weekends &&
                                <div className="open-on-weekends dont-open flex-column">
                                    <FiInfo size={32} color="#ff669d" />
                                    Não a tendemos <br />fim de semana
                                </div>
                            }
                        </div>

                        {/* <button type="button" className="contact-button">
                            <FaWhatsapp size={20} color="#FFF" />
                            Entrar em contato
                        </button> */}
                    </div>
                </div>
            </main>
        </div>
    );
}