import axios from "axios";

let instance = axios.create({
    baseURL: "http://jsonplaceholder.typicode.com/",
    responseType: "json"

});

export const albumAPI = {
    getAllAlbum() {
        return instance.get<AlbumApiType[]>('photos')
    },
}


export type AlbumApiType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}
