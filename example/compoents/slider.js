import React, { Component } from 'react';
import {
    Slider,
} from 'react-native';

export default class MySlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current || 0,
            end: props.end || 0,
        };
    }

    update(current, end = this.state.end) {
        this.setState({ current, end });
    }
    render() {
        const { current, end } = this.state;
        const { ...rest } = this.props;

        return (
            <Slider
                minimumTrackTintColor='rgba(255, 255, 255, 0.5)'
                maximumTrackTintColor='rgba(1, 1, 1, 0.4)'
                thumbTintColor='rgba(255, 120, 0, 1)'
                maximumValue={end}
                value={current}
                {...rest}
            />
        );
    }
}