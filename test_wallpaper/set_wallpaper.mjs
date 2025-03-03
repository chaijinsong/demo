import { getWallpaper, setWallpaper} from 'wallpaper';

async function main() {
    await setWallpaper('./xsk.jpeg');

    await getWallpaper();
}

main();