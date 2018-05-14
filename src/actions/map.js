import { map1 } from '../maps/maps';

export const move = (newPosition) => ({
    type: 'MOVE',
    newPosition
});

export const setMap = (map = map1) => ({
    type: 'SET_MAP',
    map
});

export const setSelected = (selected = '') => {
    return ({
    type: 'SET_SELECTED',
    selected
});
}