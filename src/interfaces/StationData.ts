export interface StationData{
    stationuuid: '',
    serveruuid: '',
    name: '',
    url: '',
    url_resolved: '',
    favicon: '',
    country: '',
    tags: string,
    votes: Number,
    language: string,
    clickcount: Number,
    clicktrend: Number,
}

export interface ResponseStationData{
    data: StationData[]
}