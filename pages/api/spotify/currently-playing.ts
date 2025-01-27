import {getCurrentlyPlaying} from '@/lib/spotify'
import {NextApiRequest, NextApiResponse} from 'next'

type Song = {
    item: {
        album: {
            name: string
            images: [
                {
                    url: string
                }
            ]
        }
        artists: [
            {
                name: string
            }
        ]
        external_urls: {
            spotify: string
        }
        name: string
    }
    is_playing: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getCurrentlyPlaying()

    if (response.status === 204 || response.status > 400) {
        return res.status(200).json({
            isPlaying: false
        })
    }

    const song = await response.json() as Song
    const {item} = song

    if (item === null) {
        return res.status(200).json({
            isPlaying: false
        })
    }

    const artist = item.artists.map(artist => artist.name).join(', ')
    const title = item.name;
    const songUrl = item.external_urls.spotify
    const album = item.album.name
    const albumImageUrl = item.album.images[0].url
    const isPlaying = song.is_playing;

    return res.status(200).json({
        artist,
        title,
        songUrl,
        album,
        albumImageUrl,
        isPlaying
    })
}