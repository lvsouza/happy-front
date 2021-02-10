import React, { useState, useMemo, useCallback, FormEvent, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import leaflet from 'leaflet';

import { Sidebar } from "../../components";
import { Assets } from "../../assets";
import './CreateOrphanage.css';
import { OrphanagesService } from "../../services";
import { useHistory } from "react-router-dom";

interface LocationMarkerProps {
    onChange?: (position: { latitude: number, longitude: number }) => void;
    position: { latitude: number, longitude: number } | null;
}
const LocationMarker: React.FC<LocationMarkerProps> = ({ onChange, position }) => {
    useMapEvents({ click: e => onChange && onChange({ latitude: e.latlng.lat, longitude: e.latlng.lng }) });

    const happyMapIcon = useMemo(() => leaflet.icon({
        iconUrl: Assets.mapMarker,
        popupAnchor: [0, -60],
        iconAnchor: [29, 68],
        iconSize: [58, 68],
    }), []);

    if (!position) return null;

    return (
        <Marker
            position={[position.latitude, position.longitude]}
            icon={happyMapIcon}
            interactive={false}
        />
    );
}

export const CreateOrphanage: React.FC = () => {
    const { push } = useHistory();

    const [position, setPosition] = useState<{ latitude: number, longitude: number } | null>(null);
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [opening_hours, setOpeningHours] = useState('');
    const [instructions, setInstructions] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('instructions', instructions);
        data.append('opening_hours', opening_hours);
        data.append('latitude', String(position?.latitude));
        data.append('longitude', String(position?.longitude));
        images.forEach(image => data.append('images', image));
        data.append('open_on_weekends', String(open_on_weekends));

        OrphanagesService.createOrphanage(data).then(success => {
            if (success) {
                alert('Cadastrado com sucesso!');
                push('/orphanages-map');
            } else {
                alert('Erro no cadastro!');
            }
        });

        console.log(data);
    }, [about, images, instructions, name, open_on_weekends, opening_hours, position, push]);

    const handleImagesChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImages(Array.from(e.target.files));
    }, []);

    return (
        <div id="page-create-orphanage" className="flex1">
            <Sidebar />

            <main className="flex1">
                <form className="create-orphanage-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Dados</legend>

                        <MapContainer
                            zoom={12}
                            className="margin-bottom-xg"
                            center={[-29.6770896,-51.0708309]}
                            style={{ width: '100%', height: 280, borderRadius: 20, border: '1px solid #D3E2E5' }}
                        >
                            <TileLayer url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`} />
                            <LocationMarker onChange={setPosition} position={position} />
                        </MapContainer>

                        <div className="input-block flex-column">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-block flex-column">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea
                                id="about"
                                value={about}
                                maxLength={300}
                                onChange={e => setAbout(e.target.value)}
                            />
                        </div>

                        <div className="input-block flex-column">
                            <label htmlFor="images">Fotos</label>

                            <div className="image-container">
                                {images.map((image, index) => (
                                    <img key={index} src={URL.createObjectURL(image)} alt={index.toString()} />
                                ))}

                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>

                            <input
                                multiple
                                type="file"
                                id="image[]"
                                style={{ display: 'none' }}
                                onChange={handleImagesChange}
                            />

                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block flex-column">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea
                                maxLength={300}
                                id="instructions"
                                value={instructions}
                                onChange={e => setInstructions(e.target.value)}
                            />
                        </div>

                        <div className="input-block flex-column">
                            <label htmlFor="opening_hours">Horário de funcionamento</label>
                            <input
                                id="opening_hours"
                                value={opening_hours}
                                onChange={e => setOpeningHours(e.target.value)}
                            />
                        </div>

                        <div className="input-block flex-column">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>
                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? "active" : ""}
                                    onClick={() => setOpenOnWeekends(true)}
                                >Sim</button>
                                <button
                                    type="button"
                                    className={!open_on_weekends ? "active" : ""}
                                    onClick={() => setOpenOnWeekends(false)}
                                >Não</button>
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
