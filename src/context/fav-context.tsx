import { createContext, ReactNode, useContext, useState } from "react";
import { StationData } from "../interfaces/StationData";
import { getFavStations } from "../services/stations-services";

interface FavStationContextType {
    favStations: StationData[],
    addStation: (station: StationData) => void,
    removeStation: (station: StationData) => void
}

const defaultValue: FavStationContextType = {
    favStations: [],
    addStation: () => { },
    removeStation: () => { }
}

const FavContext = createContext(defaultValue)

interface FavContextProviderPrpos {
    children: ReactNode
}

export function FavContextProvider({ children }: FavContextProviderPrpos) {
    const [favStations, setFavStations] = useState<StationData[]>(getFavStations())

    function addStation(station: StationData) {
        if (!favStations.some(s => s.stationuuid === station.stationuuid)) {
            const updated = [...favStations, station];
            localStorage.setItem('favStations', JSON.stringify(updated));
            setFavStations(updated);
        }else {
            alert('estação ja adicionada.')
        }

    }

    function removeStation(station: StationData) {
        const stationId = station.stationuuid
        const updated = favStations.filter(s => s.stationuuid !== stationId);
        localStorage.setItem('favStations', JSON.stringify(updated));
        setFavStations(updated);
    }

    return (
        <FavContext.Provider value={{ favStations, addStation, removeStation }}>
            {children}
        </FavContext.Provider>
    );
}

export function useFavStations() {
    return useContext(FavContext);
}