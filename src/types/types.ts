export type MapType = {
    region: object,
    coordinates: Latlng[]
}
export type data = {
    coordinates : any[],
    region : object,
    date : string
}
export type _Marker = {
    latlng: Latlng,
    title: string,
    description: string
}
export type Latlng = {
    latitude: Number,
    longitude: Number
}
