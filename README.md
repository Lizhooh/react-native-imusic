
## react-native-imusic
React-native-imusic is a music player component similar to HTML5 Audio, based on react-native-sound.

<a href="https://www.npmjs.com/package/react-native-imusic"><img src="https://img.shields.io/npm/v/react-native-imusic.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/react-native-imusic"><img src="https://img.shields.io/npm/dm/react-native-imusic.svg?style=flat-square"></a>

react-native-imusic 是一个类似 HTML5 Audio 的音乐播放组件，其底层基于 react-native-sound。[中文说明 -> 点这里](./CH_README.md)

![](./example/image/16470418034435.png)

### Installation

```bash
yarn add react-native-imusic
# or
npm install --save react-native-imusic
```

link:

```bash
react-native link react-native-sound
```

modify the code in `android/build.gradle`:

```js
allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            url 'https://maven.google.com'
        }
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```

### Usage

```js
import IMusic from 'react-native-imusic';

<IMusic
    source={{ uri: song.url }}
    play={play}
    onProgress={d => {
        // ...
    }}
/>
```

### Example
Please check [example code](./example/index.js).

### Props

| name                   | type   | default | description                              |
| :--------------------- | :----- | :------ | :--------------------------------------- |
| source                 | object | {}      | music source, __@required__.             |
| play                   | bool   | false   | whether to play music, __@required__.    |
| loop                   | bool   | false   | whether to loop play music.              |
| autoPlay               | bool   | false   | Whether to play automatically after loading is complete. |
| preload                | bool   | false   | Whether to preload.                      |
| initSeek               | number | 0       | Initialize playback position.            |
| progressUpdateInterval | number | 500     | Progress Update Interval.                |

<br />

__event:__

| name           | type     | default | description                              |
| :------------- | :------- | :------ | :--------------------------------------- |
| onProgress     | function | d => d  | music playback progress event.           |
| onLoadStart    | function | e => e  | fires when the music is loadedstart.     |
| onLoad         | function | d => d  | fires when the music is loaded.          |
| onPlay         | function | e => e  | fires when the music plays.              |
| onPause        | function | e => e  | fires when the music is paused.          |
| onEnd          | function | e => e  | fires when the music ends.               |
| onError        | function | e => e  | fires when an error occurs in music playback/loading. |

__onProgress callback param data:__

```js
{
    currentTime: 22.40,
    duration: 183.32,
    volume: 1,
    percent: 12.22,
}
```

__onLoad callback param data:__

```js
{
    currentTime: 0,
    duration: 183.32,
    volume: 1,
    percent: 0,
}
```

### Method

| name   | type                   | description |
| :----- | :--------------------- | :---------- |
| isPlay | function               |             |
| seek   | function(time: number) |             |
| volume | function(num?: number) |             |
| reLoad | function               |             |


### Change log
