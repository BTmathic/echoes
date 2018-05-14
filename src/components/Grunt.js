import React from 'react';

export default class Grunt extends React.Component {
    state = {
        selected: ''
    }

    onClick = (e) => {
        this.setState(() => ({
            selected: 'selected'
        }));
        console.log('hullo!', e.buttons);
    }

    render() {
        return (
            <div className={`grunt-tile tile ${this.state.selected}`}
                onClick={(e) => {this.onClick(e)}}></div>
        );
    }
}