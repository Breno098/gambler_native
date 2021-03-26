import React, { useState, useContext, useEffect } from 'react';
import { Animated } from 'react-native';

import App from '../../../components/App';
import SlideButtonRoute from '../../../components/SlideButtonRoute';

export default function Registrations() {

  const [country] = useState(new Animated.Value(0))
  const [player] = useState(new Animated.Value(0))
  const [stadium] = useState(new Animated.Value(0))
  const [team] = useState(new Animated.Value(0))
  const [game] = useState(new Animated.Value(0))
  const [competition] = useState(new Animated.Value(0))

  return (
      <App style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
        <SlideButtonRoute
          animated={player}
          direction="left"
          routeName="Player"
          image="player"
          title="Jogador"
        />
        <SlideButtonRoute
          animated={country}
          direction="right"
          routeName="Country"
          image="country"
          title="País"
        />
        <SlideButtonRoute
          animated={stadium}
          direction="left"
          routeName="Player"
          image="stadium"
          title="Estádio"
        />
        <SlideButtonRoute
          animated={team}
          direction="right"
          routeName="Country"
          image="team"
          title="Time"
        />
        <SlideButtonRoute
          animated={game}
          direction="left"
          routeName="Player"
          image="game"
          title="Jogo"
        />
        <SlideButtonRoute
          animated={competition}
          direction="right"
          routeName="Country"
          image="competition"
          title="Competição"
        />
      </App>
  );
}