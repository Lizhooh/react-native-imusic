
export default async function MusicData() {
    // 先获取专辑列表
    const res1 = await fetch('http://m.kugou.com/plist/list/482692?json=true').then(res => res.json());
    // 从列表里获取每首歌的 mp3
    const list = res1.list.list.info.slice();

    const ress = await Promise.all(list.map((item => {
        const url = `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${item.hash}`;
        return fetch(url).then(res => res.json());
    })));

    for (let i = 0; i < ress.length; i++) {
        const res2 = ress[i];
        list[i].detail = {
            url: res2.url,
            image: res2.imgUrl.replace(/\{size\}/, 480),
            timeLen: res2.timeLength,
            singer: res2.choricSinger,
            name: res2.songName,
        };
    }

    return list;
}