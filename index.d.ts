import * as React from 'react';

interface IMusicProps {
    source: { uri: string },
    play: boolean,
    autoPlay?: boolean,
    preload?: boolean,
    initSeek?: number,
    debug?: boolean,
    progressUpdateInterval?: number,

    onProgress?(d: {
        currentTime: number,
        duration: number,
        volume: number,
        percent: number,
    }): any,
    onError?({
        message: string,
    }): any,
    onLoadStart?(): any,
    onLoad?(d: {
        currentTime: number,
        duration: number,
        volume: number,
        percent: number,
    }): any,
    onPlay?(): any,
    onPause?(): any,
    onEnd?(): any,
}

export default class IMusic extends React.Component<IMusicProps> {
    isPlay(): void;
    seek(time: number): void;
    volume(num?: number): void | number;
    reLoad(): void;
}