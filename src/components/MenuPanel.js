import React from 'react';
import Minimap from './Minimap';

export default class MenuPanel extends React.Component {
    render() {
        return (
            <div>
                <Minimap />
                <p>Selected player menu</p>
            </div>
        );
    }
}