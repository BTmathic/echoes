import React from 'react';
import Game from './Game';
import MenuPanel from './MenuPanel';

export default class GameWindow extends React.Component {
  onRightClick = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div id='game-container' onContextMenu={(e) => { this.onRightClick(e) }}>
        <Game />
        <MenuPanel />
      </div>
    );
  }
}