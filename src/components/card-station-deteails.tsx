import { StationData } from "../interfaces/StationData";

export interface CardStationDetailsProps {
    station: StationData
}

export function CardStationDetails({ station }: CardStationDetailsProps) {

    return (
        <div
            className="w-full flex flex-col rounded-md shadow-lg bg-zinc-900
            relative py-8 justify-between items-center gap-10"
        >
            <div className="w-full flex flex-col text-center">
                <h2 className="text-gray-300 font-semibold capitalize">{station.name}</h2>
                <span className="text-gray-500 text-xs">{station.tags}</span>
            </div>

            <div className="p-2 rounded-full w-[100px] md:w-[150px] relative">
                <img
                    src={station.favicon}
                    alt=""
                    className="object-cover w-full relative z-10"
                />
                <div className="absolute inset-1 -z-1 bg-blue-600 rounded-full blur-2xl" />
            </div>

            <audio src={station.url} controls />

        </div>
    )
}