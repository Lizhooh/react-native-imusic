import React, { Component } from 'react';
import {
    View, StyleSheet,
    Platform
} from 'react-native';
import Sound from 'react-native-sound';
import propTypes from 'prop-types';

export default class IMusic extends Component {
    static defaultProps = {
        source: {},
        play: false,
        autoPlay: false,
        preload: false,
        initSeek: 0,
        debug: false,
        progressUpdateInterval: 500,

        onProgress: d => d,
        onError: e => e,
        onLoadStart: e => e,
        onLoad: d => d,
        onPlay: e => e,
        onPause: e => e,
        onEnd: e => e,
        onVolumeChange: e => e,
    };

    static propTypes = {
        source: propTypes.object,
        play: propTypes.bool,
        autoPlay: propTypes.bool,
        preload: propTypes.bool,
        initSeek: propTypes.number,
        debug: propTypes.bool,
        progressUpdateInterval: propTypes.number,

        onProgress: propTypes.func,
        onError: propTypes.func,
        onLoadStart: propTypes.func,
        onLoad: propTypes.func,
        onPlay: propTypes.func,
        onPause: propTypes.func,
        onEnd: propTypes.func,
        onVolumeChange: propTypes.func,
    }

    constructor(props) {
        super(props);
        this.debug = props.debug;
        this.state = {
            play: props.autoPlay ? true : props.play,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.source.uri !== nextProps.source.uri) {
            this.sound && this.sound.release();
            this._initSound(nextProps.source);
        }
        else {
            if (!this.sound && nextProps.play) {
                this.setState({ play: true }, () => {
                    this._initSound(nextProps.source, () => {
                        this._play();
                    });
                })
            }
            else if (this.props.play !== nextProps.play) {
                this.setState({ play: nextProps.play }, () => {
                    nextProps.play ? this._play() : this._pause();
                });
            }
        }
        this.debug = nextProps.debug;
    }

    componentDidMount() {
        if (this.props.preload) {
            this._initSound(this.props.source);
        }
    }

    _initSound = (source, cb) => {
        if (source && source.uri) {
            this._onLoadStart({});
            this.sound = new Sound(source.uri, null, err => {
                if (err) return this._onError({ err });
                // 尽可能给出更多的有用数据
                this.sound.getCurrentTime(currentTime => {
                    const duration = this.sound.getDuration();
                    const volume = this.sound.getVolume();
                    this._onLoad({
                        currentTime,
                        volume,
                        duration,
                        percent: (currentTime / duration * 10000 | 0) / 100,
                    });
                });
                // 尝试播放
                if (this.state.play) {
                    this._play();
                }
                typeof cb === 'function' && cb();
            });
        }
    }

    _loop = (cb) => {
        // 每一个轮回，获取有用信息
        this._timer = setTimeout(() => {
            this.sound.getCurrentTime(currentTime => {
                const duration = this.sound.getDuration();
                const volume = this.sound.getVolume();

                if (this.state.play) {
                    this._onProgress({
                        currentTime,
                        duration,
                        volume,
                        percent: (currentTime / duration * 10000 | 0) / 100,
                    });
                }

                this.state.play && this._loop();
            });
        }, this.props.progressUpdateInterval);
    }

    _play = () => {
        if (this.sound) {
            this.sound.play(success => {
                if (!success) {
                    this.sound.release();
                    this._onError({});
                }
                else {
                    this._onEnd();
                }
            });
            this.setState({ play: true }, this._loop);
            this.props.onPlay();
        }
    }

    _pause = () => {
        if (this.sound) {
            this.sound.pause();
            this.setState({ play: false });
            this.props.onPause();
        }
    }

    componentWillUnmount() {
        this.sound && this.sound.release();
        this._timer && clearTimeout(this._timer);
    }

    _debug = (...arg) => {
        this.debug && console.log(...arg);
    }

    // events
    _onProgress = d => {
        this._debug('_onProgress');
        this.props.onProgress(d);
    }
    _onError = e => {
        this._debug('_onError');
        this.props.onError(e);
    }
    _onLoadStart = e => {
        this._debug('_onLoadStart');
        this.props.onLoadStart(e);
    }
    _onLoad = d => {
        this._debug('_onLoad');
        this.props.onLoad(d);
    }
    _onEnd = e => {
        this._debug('_onEnd');
        this.sound && this.sound.release();
        this.props.onEnd(e);
    }

    // methods
    isPlay = () => {
        return this.state.play;
    }

    seek = (time) => {
        this.sound && this.sound.setCurrentTime(time);
    }

    volume = (num) => {
        if (typeof num === 'number') {
            this.sound && this.sound.setVolume(num);
            return;
        }
        return this.sound && this.sound.getVolume();
    }

    reLoad = () => {
        if (this.sound) {
            this.sound.release();
            if (Platform.OS === 'android') {
                this.sound.reset();
            }
        }
        this._initSound(this.props.source);
    }

    render() {
        return (
            <View style={styles.container} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 0, height: 0,
    }
});
