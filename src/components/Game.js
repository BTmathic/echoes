import React from 'react';
import Grunt from './Grunt';
import { map1 } from '../maps/maps';
import { connect } from 'react-redux';
import { move, setMap, setSelected } from '../actions/map';
import RenderMap from '../selectors/renderMap';

export class Game extends React.Component {
  state = {
    mapX: 9,
    mapY: 7,
    selected: ''
  };


  handleAction = (e) => {
    e.preventDefault();
    const keyName = e.key;
    let currentX = this.state.mapX;
    let currentY = this.state.mapY;
    if (keyName === 'ArrowLeft' && currentX > 9) {
      currentX--;
    } else if (keyName === 'ArrowRight' && currentX < this.props.map[0].length - 11) {
      currentX++;
    } else if (keyName === 'ArrowUp' && currentY > 7) {
      currentY--;
    } else if (keyName === 'ArrowDown' && currentY < this.props.map.length - 8) {
      currentY++;
    }
    this.setState(() => ({
      mapX: currentX,
      mapY: currentY
    }));
  }

  handleMovement = (newPosition) => {
    // make this go step by step, firstly ignoring any obstacles, and then once
    // moving to the end position works one square at a time (diagonal routes?)
    // then have it just stop if there is an obstacles in the way. Once those are
    // done, commit/push and next step is to adjust the moving path to allow for
    // an obstacle, move up or down, if possible, maybe?

    // Once this is done, work on cutting down trees. Not just cutting, but also
    // once a tree is cut, take back to town hall (or do nothing if there isn't one)
    // and then return to position of tree and look for trees within one or two tiles
    // if one is found, go to chop that one.

    // Once that's done, next is gold. Put a mine on the map, harvest, and end case
    // return to square with mine if it's gone and stand still

    // Once that's done...

    // NOTE that our array indexing is a reflection about the x-axis of
    // the standard (x,y)-coordinate system, so instead of y = mx + b we
    // are using y = -mx - b
    const currentPosition = this.state.selected;
    const xMove = newPosition[1] - currentPosition[1];
    const yMove = newPosition[0] - currentPosition[0];
    const slope = yMove/xMove;
    const yIntercept = currentPosition[0] - slope*currentPosition[1];
    const xIntercept = -(currentPosition[0]/slope - currentPosition[1]);
    let walkPath = [currentPosition];

    if (Math.abs(xMove) >= Math.abs(yMove)) {
      for (let i = 0; i < Math.abs(xMove); i++) {
        const xDirection = xMove === Math.abs(xMove) ? 1 : -1;
        const nextX = walkPath[i][1] + xDirection;
        walkPath.push([Math.round(slope * nextX + yIntercept), nextX]);
      }
    } else {
      for (let i = 0; i < Math.abs(yMove); i++) {
        const yDirection = yMove === Math.abs(yMove) ? 1 : -1;
        const nextY = walkPath[i][0] + yDirection;
        walkPath.push([nextY, Math.round(nextY/slope + xIntercept)]);
      }
    }

    for (let i = 0; i < walkPath.length; i++) {
      setTimeout(() => {
        this.props.move(walkPath[i]);
      }, 500*i);
    };
  }

  handleSelectUnit = (position) => {
    this.props.setSelected(position);
    this.setState(() => ({
      selected: position
    }));
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleAction);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleAction);
  }

  render() {
    return (
      <div id='game-map'>
        {RenderMap(this.state.mapX, this.state.mapY, this.props.map, this.handleMovement, this.handleSelectUnit)}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  map: state.map.map,
  selected: state.selected
});

const mapDispatchToProps = (dispatch, props) => ({
  setMap: (map) => dispatch(setMap(map)),
  setSelected: (position) => dispatch(setSelected(position)),
  move: (newPosition) => dispatch(move(newPosition))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);