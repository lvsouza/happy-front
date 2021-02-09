import React, { useMemo } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FiClock, FiInfo } from "react-icons/fi";
import leaflet from 'leaflet';

import { Sidebar } from "../../components";
import { Assets } from "../../assets";
import './Orphanage.css';

export const Orphanage: React.FC = () => {

  const happyMapIcon = useMemo(() => leaflet.icon({
    iconUrl: Assets.mapMarker,
    popupAnchor: [0, -60],
    iconAnchor: [29, 68],
    iconSize: [58, 68],
  }), []);

  return (
    <div id="page-orphanage" className="flex1">
      <Sidebar />

      <main className="flex1">
        <div className="orphanage-details flex-column">
          <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />

          <div className="images">
            <button className="active" type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
          </div>

          <div className="orphanage-details-content flex-column">
            <h1>Lar das meninas</h1>
            <p>Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.</p>

            <div className="map-container flex-column">
              <MapContainer
                zoom={16}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                center={[-27.2092052, -49.6401092]}
                style={{ width: '100%', height: 280 }}
              >
                <TileLayer url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`} />
                <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052, -49.6401092]} />
              </MapContainer>

              <footer>
                <a href="">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}