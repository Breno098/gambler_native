import React from 'react';

import App from '../../../components/App';
import SlideButtonRoute from '../../../components/SlideButtonRoute';

export default function Registrations() {

  return (
      <App style={{ justifyContent: 'space-around', alignItems: 'flex-end' }}>
        <SlideButtonRoute
          direction="right"
          routeName="Player"
          image="player"
          label="Jogador"
          width="90%"
        />
        <SlideButtonRoute
          direction="right"
          routeName="Country"
          image="country"
          label="País"
          width="90%"
        />
        <SlideButtonRoute
          direction="right"
          routeName="Player"
          image="stadium"
          label="Estádio"
          width="90%"
        />
        <SlideButtonRoute
          direction="right"
          routeName="Country"
          image="team"
          label="Time"
          width="90%"
        />
        <SlideButtonRoute
          direction="right"
          routeName="Player"
          image="game"
          label="Jogo"
          width="90%"
        />
        <SlideButtonRoute
          direction="right"
          routeName="Country"
          image="competition"
          label="Competição"
          width="90%"
        />
      </App>
  );
}