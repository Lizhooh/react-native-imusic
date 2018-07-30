
## react-native-imusic
react-native-imusic 是一个类似 HTML5 Audio 的音乐播放组件，其底层基于 react-native-sound。

<a href="https://www.npmjs.com/package/react-native-imusic"><img src="https://img.shields.io/npm/v/react-native-imusic.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/react-native-imusic"><img src="https://img.shields.io/npm/dm/react-native-imusic.svg?style=flat-square"></a>


### 安装

```bash
yarn add react-native-imusic
# or
npm install --save react-native-imusic
```

链接：

```bash
react-native link react-native-sound
```

在 `android/build.gradle` 里修改代码：

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

### 使用

```js
import IVideo from 'react-native-imusic';

<IMusic
    ref={r => this.music = r}
    source={{ uri: song.url }}
    play={play}
    onProgress={d => {
        if (!this.$lock) {
            this.slider.update(d.currentTime, d.duration);
            this.songtime.update(d.currentTime, d.duration);
        }
    }}
/>
```

### 示例
请查看 [示例代码](./example/index.js)。

### 属性

| name                   | type   | default | description           |
| :--------------------- | :----- | :------ | :-------------------- |
| source                 | object | {}      | 音乐数据源，__@required__。  |
| play                   | bool   | false   | 是否播放音乐，__@required__。 |
| autoPlay               | bool   | false   | 是否在加载完成后播放音乐。         |
| preload                | bool   | false   | 是否进行预加载。              |
| initSeek               | number | 0       | 初始化音乐播放位置。            |
| progressUpdateInterval | number | 500     | onProgress 的更新时间间隔。   |

<br />

__event:__

| name           | type     | default | description      |
| :------------- | :------- | :------ | :--------------- |
| onProgress     | function | d => d  | 在音乐播放时，进度改变时触发。  |
| onLoadStart    | function | e => e  | 资源加载开始时触发。       |
| onLoad         | function | d => d  | 资源加载完成后触发。       |
| onPlay         | function | e => e  | 播放时触发。           |
| onPause        | function | e => e  | 暂停时触发。           |
| onEnd          | function | e => e  | 播放结束时触发。         |
| onError        | function | e => e  | 在加载或者播放时发生错误时触发。 |
| onVolumeChange | function | e => e  | 音乐声音大小改变时触发。     |

__onProgress 的回调参数数据:__

```js
{
    currentTime: 22.40,
    duration: 183.32,
    volume: 1,
    percent: 12.22,
}
```

__onLoad 的回调参数数据:__

```js
{
    currentTime: 0,
    duration: 183.32,
    volume: 1,
    percent: 0,
}
```

### 方法

| name   | type                   | description |
| :----- | :--------------------- | :---------- |
| isPlay | function               |             |
| seek   | function(time: number) |             |
| volume | function(num?: number) |             |
| reLoad | function               |             |

### 更新日志



