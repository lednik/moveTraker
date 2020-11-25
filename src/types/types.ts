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
export type _RouteView = {
    route: string,
    toStartView(): void
}
export type RoutesType = {
    toStartView(): void,
    showRoute(value: string): void
}
export type _StartView = {
    startWalking(): void,
    showRoutes(): void
}
export type _WalkingView = {
    stopWalking(): void
}