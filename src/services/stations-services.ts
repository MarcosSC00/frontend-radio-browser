import { getStations } from "../api/stations-api";
import { StationData } from "../interfaces/StationData";

export async function Formatter() {
    const stations = await getStations()
    if (stations) {
        const formattedStations = stations.map((station) => {
            return (
                ({
                    stationuuid,
                    serveruuid,
                    name,
                    url,
                    url_resolved,
                    favicon,
                    country,
                    tags,
                    votes,
                    language,
                    clickcount,
                    clicktrend
                }: StationData) => ({
                    stationuuid,
                    serveruuid,
                    name,
                    url,
                    url_resolved,
                    favicon,
                    country,
                    tags,
                    votes,
                    language,
                    clickcount,
                    clicktrend
                })
            )(station)

        })
        return formattedStations
    }
}

export function addFav(listFav: StationData[], station: StationData) {
    if (station) {
        listFav.push(station)
    }
}

export function searchStation(name: string, targetList: StationData[]): StationData[] {
    const filterResult = targetList.filter(t => (t.name.toLowerCase().includes(name.toLowerCase()) ||
        t.country.toLocaleLowerCase().includes(name.toLocaleLowerCase())) ||
        t.language?.toLowerCase().includes(name.toLocaleLowerCase())
    )
    return filterResult
}

export function getFavStations() {
    const favStations = localStorage.getItem('favStations')
    if (favStations) {
        return JSON.parse(favStations)
    }
    return []
}

export function removeFavStation(favStationToRemove: StationData) {
    const favStations = JSON.parse(localStorage.getItem('favStations') || '[]')
    if (!Array.isArray(favStations)) {
        throw new Error("Os dados no 'localStorage' não são um array.");
    }
    const updateStations = favStations.filter(station => station.stationuuid !== favStationToRemove.stationuuid)

    localStorage.setItem('favStations', JSON.stringify(updateStations))
}