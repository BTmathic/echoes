import { map1 } from '../maps/maps';

const mapReducerDefaultState = {
    map: map1,
    selected: ''
}

export default (state = mapReducerDefaultState, action) => {
    switch (action.type) {
        case 'MOVE':
            if (!!state.selected) {
                const oldPosition = state.selected;
                const fromTile = state.map[oldPosition[0]][oldPosition[1]];
                const toTile = state.map[action.newPosition[0]][action.newPosition[1]];
                const newMap = state.map.map((row, index) => {
                  let newRow;
                  if (index === eval(action.newPosition[0])) {
                    newRow = row.map((tile, tileIndex) => {
                      if (tileIndex === eval(action.newPosition[1])) {
                        return fromTile;
                      } else if (index === eval(oldPosition[0]) && tileIndex === eval(oldPosition[1])) {
                        return toTile;
                      } else {
                        return tile;
                      }
                    });
                  }
                  else if (index === eval(oldPosition[0])) {
                    newRow = row.map((tile, tileIndex) => {
                      if (tileIndex === eval(oldPosition[1])) {
                        return toTile;
                      } else {
                        return tile;
                      }
                    });
                  } else {
                    newRow = row;
                  }
                  return newRow;
                });
                return {
                  ...state,
                  map: newMap
                }
            } else {
                return {
                    ...state
                };
            }
        case 'SET_MAP':
            return {
                ...state,
                map: action.map,
            };
        case 'SET_SELECTED':
            return {
                ...state,
                selected: action.selected
            };
        default:
            return state;
    };
};