import React from 'react';

import App from '../../../components/App';
import SlideButtonRoute from '../../../components/SlideButtonRoute';

export default function Registrations() {

  return (
      <App style={{ justifyContent: 'space-around', alignItems: 'flex-end' }}>
        <SlideButtonRoute
          direction="left"
          routeName="Player"
          image="player"
          label="Jogador"
        />
        <SlideButtonRoute
          direction="right"
          routeName="Country"
          image="country"
          label="País"
        />
        <SlideButtonRoute
          direction="left"
          routeName="Player"
          image="stadium"
          label="Estádio"
        />
        <SlideButtonRoute
          direction="right"
          routeName="Country"
          image="team"
          label="Time"
        />
        <SlideButtonRoute
          direction="left"
          routeName="Player"
          image="game"
          label="Jogo"
        />
        <SlideButtonRoute
          direction="right"
          routeName="Country"
          image="competition"
          label="Competição"
        />
      </App>
  );
}