import React from "react";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import leaflet from 'leaflet';

import { Assets } from "../../assets";
import './CreateOrphanage.css';

const happyMapIcon = leaflet.icon({
  iconUrl: Assets.mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
});

export const CreateOrphanage: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <div id="page-create-orphanage" className="flex1">
      <aside>
        <img src={Assets.mapMarker} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="var(--text-color)" />
          </button>
        </footer>
      </aside>

      <main className="flex1">
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              zoom={15}
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
            >
              <TileLayer url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`} />
              <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052, -49.6401092]} />
            </MapContainer>

            <div className="input-block flex-column">
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div>

            <div className="input-block flex-column">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} />
            </div>

            <div className="input-block flex-column">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block flex-column">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div>

            <div className="input-block flex-column">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" />
            </div>

            <div className="input-block flex-column">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
