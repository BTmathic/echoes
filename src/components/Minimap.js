import React from 'react';
import { connect } from 'react-redux';

class Minimap extends React.Component {
  renderMinimap = () => {
    let minimap = [];
    for (let i = 0; i < this.props.map.length; i++) {
      for (let j = 0; j < this.props.map[0].length; j++) {
        const key = [i, j];
        let tile = this.props.map[i][j];
        let renderTile = undefined;
        renderTile = <div
          className={`${tile}-tile minimap-tile`}
          id={key}
          key={key}></div>;

        minimap.push(renderTile);
      }
    }

    return minimap;
  }

  render() {
    return (
      <div id='minimap'>
        {this.renderMinimap()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  map: state.map.map
});

export default connect(mapStateToProps)(Minimap);