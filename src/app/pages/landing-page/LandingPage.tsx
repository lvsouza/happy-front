import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Assets } from '../../assets';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  return (
    <div id="page-landing" className="flex-content-center flex-items-center">
      <div className="container-wrapper flex-space-between full-height full-width flex-items-start">

        <div className="container-wrapper flex-column flex-space-between full-height full-width flex-items-start flex2">
          <img src={Assets.logo} alt="Happy" />

          <main>
            <h1 className="font-weight-xg">Leve felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas crianças.</p>
          </main>

        </div>

        <img className="landing-image" src={Assets.landing} alt="Landing" />

        <div className="flex-space-between full-height flex-items-end flex-column">
          <div className="flex1 flex-column text-align-right">
            <strong className="font-weight-xg font-size-m">Rio Grande do Sul</strong>
            <span className="font-size-xg">Campo Bom</span>
          </div>

          <Link to="/orphanages-map" className="enter-app color-yellow display-flex flex-content-center flex-items-center">
            <FiArrowRight size={'2.5rem'} color="rgba(0, 0, 0, 0.6)" />
          </Link>
        </div>
      </div>
    </div>
  );
}
