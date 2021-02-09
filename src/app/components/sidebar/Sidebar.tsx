import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Assets } from '../../assets';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
    const { goBack } = useHistory();

    return (
        <aside className="app-sidebar">
            <img src={Assets.mapMarker} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="var(--text-color)" />
                </button>
            </footer>
        </aside>
    );
}
