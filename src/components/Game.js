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
    this.props.move(newPosition);
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