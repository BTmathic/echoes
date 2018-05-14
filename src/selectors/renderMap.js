import React from 'react';
import Grunt from '../components/Grunt';

export default (x, y, map, handleMovement, handleSelect) => {
  let visibleMap = [];
  for (let i = y - 7; i <= y + 7; i++) {
    for (let j = x - 9; j <= x + 10; j++) {
      const key = [i, j];
      let tile = map[i][j];
      let renderTile = undefined;
      renderTile = <div
        className={`${tile}-tile tile`}
        id={key}
        key={key}
        onClick={(e) => {
          const tilePosition = e.target.id.split(',');
          handleSelect(tilePosition);
        }}
        onContextMenu={(e) => {
          const tilePosition = e.target.id.split(',');
          handleMovement(tilePosition);
        }}></div>;
        
      visibleMap.push(renderTile);
    }
  }

  return visibleMap;
}