import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
} from 'react-native';

// 时间格式化
export function timeFmt(timeLen = 0) {
    const ft = n => n < 10 ? '0' + n : n;

    if (!timeFmt.cache) {
        timeFmt.cache = [];
    }

    if (timeFmt.cache[timeLen]) {
        return timeFmt.cache[timeLen];
    }
    else {
        const end = timeLen % 60 | 0;
        const start = timeLen / 60 % 60 | 0;
        const timeStr = `${ft(start <= end ? start : end)}:${ft(end)}`;
        timeFmt.cache[timeLen] = timeStr;
        return timeStr;
    }
}

export default class SongTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current,
            end: props.end,
        }
    }

    update(current, end = this.state.end) {
        this.setState({ current, end });
    }

    render() {
        const { current, end } = this.state;
        const { style } = this.props;

        return (
            <View style={[styles.container, style]}>
                <Text style={styles.text}>{timeFmt(current)} / </Text>
                <Text style={styles.text}>{timeFmt(end)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(30, 30, 30, 0.75)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        justifyContent: 'center',
        width: 70,
    },
    text: {
        includeFontPadding: false,
        fontSize: 10,
        color: '#fff',
        textShadowColor: 'rgba(1, 1, 1, 0.12)',
        textShadowOffset: {
            width: 0.8,
            height: 1.2,
        },
        textShadowRadius: 1,
    },
});