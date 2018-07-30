import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet,
    ScrollView,
    TouchableNativeFeedback as Touch,
    Image,
} from 'react-native';

import IMusic from 'react-native-imusic';
import api from '.api';
import Slider from './components/slider';
import SongTime from './components/song-time';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            index: 0,
            play: false,
        }
    }

    componentWillMount() {
        api().then(res => this.setState({ list: res, index: 0 }));
    }

    render() {
        const { list, index, play } = this.state;

        if (list.length === 0) {
            return <View></View>
        }

        const song = list[index].detail;

        return (
            <View style={styles.container}>
                <IMusic
                    ref={r => this.music = r}
                    source={{ uri: song.url }}
                    play={play}
                    onLoad={d => {
                        this.slider.update(d.currentTime, d.duration);
                        this.songtime.update(d.currentTime, d.duration);
                    }}
                    onProgress={d => {
                        if (!this.$lock) {
                            this.slider.update(d.currentTime, d.duration);
                            this.songtime.update(d.currentTime, d.duration);
                        }
                    }}
                    onEnd={e => this.setState({ index: index < list.length - 1 ? index + 1 : 0 })}
                />
                <View style={styles.body}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Image
                                source={{ uri: song.image }}
                                style={styles.image}
                                resizeMode='cover'
                            />
                            <Text>{song.name}</Text>
                            <Text>{song.singer}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Touch onPress={e => this.setState({ play: true })}>
                                <View style={styles.button}>
                                    <Text>播放</Text>
                                </View>
                            </Touch>
                            <Touch onPress={e => this.setState({ play: false })}>
                                <View style={styles.button}>
                                    <Text>暂停</Text>
                                </View>
                            </Touch>
                            <Touch onPress={e => this.music.reLoad()}>
                                <View style={styles.button}>
                                    <Text>重新加载</Text>
                                </View>
                            </Touch>
                        </View>
                    </View>
                    <View>
                        <Slider ref={r => this.slider = r}
                            onTouchStart={e => this.$lock = true}
                            onTouchEnd={e => this.$lock = false}
                            onValueChange={v => {
                                if (this.$lock) {
                                    this.slider.update(v);
                                    this.songtime.update(v);
                                }
                            }}
                            onSlidingComplete={v => {
                                this.music.seek(v);
                                this.slider.update(v);
                                this.songtime.update(v);
                            }}
                        />

                        <View style={{ alignItems: 'center' }}>
                            <SongTime ref={r => this.songtime = r} style={{
                                marginTop: 10
                            }} />
                        </View>

                    </View>
                </View>

                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    contentContainerStyle={{
                        backgroundColor: '#f1f2f2',
                    }}>
                    {list.map((item, index) => (
                        <Touch key={index} onPress={e => {
                            this.setState({ index: index })
                        }}>
                            <View style={styles.item}>
                                <Text>{item.detail.name}</Text>
                                <Text style={styles.singer}>{item.detail.singer}</Text>
                            </View>
                        </Touch>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        height: 200,
        padding: 20,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    item: {
        flexDirection: 'row',
        padding: 12,
    },
    singer: {
        marginLeft: 12,
    },
    button: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f2f3f4',
    }
});
