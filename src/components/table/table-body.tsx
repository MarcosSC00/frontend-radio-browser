import { AudioLines, Play, Square, Trash2 } from "lucide-react";
import { TableCell } from "./table-cell";
import { TableRow } from "./table-row";
import { ModalPlayer } from "../modal-player";
import { StationData } from "../../interfaces/StationData";
import { useState } from "react";
import { useFavStations } from "../../context/fav-context";

interface TableBodyProps {
    list: StationData[],
    page: number
}

export function TableBody({ list, page }: TableBodyProps) {

    const { removeStation } = useFavStations()
    const [activeStation, setActiveStation] = useState<string | null>()

    function handlePlay(id: string) {
        if (activeStation) {
            const activeAudio = document.getElementById(activeStation) as HTMLAudioElement
            activeAudio.pause()
        }

        const audio = document.getElementById(id) as HTMLAudioElement
        audio.play()
        setActiveStation(id)
    }

    function handlePause(id: string) {
        const audio = document.getElementById(id) as HTMLAudioElement
        audio.pause()
        setActiveStation(null)
    }

    return (
        <tbody className="bg-gray-800">
            {list?.slice((page - 1) * 10, page * 10).map((l) => (
                <TableRow key={l.stationuuid}>
                    <TableCell>
                        <div className="flex items-center text-sm">
                            <div className="relative w-8 mr-3 rounded-full">
                                <img
                                    className="object-cover w-full h-full rounded-full"
                                    src={l.favicon}
                                    alt="station image"
                                />
                            </div>

                            <div className="relative">
                                <div className="font-semibold flex">
                                    {l.name}
                                    {activeStation === l.stationuuid && (
                                        <div
                                            className="ml-3 p-1 rounded-full bg-gray-600 
                                            animate-pulse flex"
                                        >
                                            <AudioLines size={10} />
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600">{l.country}</p>

                            </div>

                        </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-xs">
                        <div className="flex justify-end gap-3">
                            <audio id={l.stationuuid} src={l.url} className="hidden" />
                            {activeStation === l.stationuuid ? (
                                <button
                                    onClick={() => handlePause(l.stationuuid)}
                                    className="flex items-center text-emerald-600 p-1 md:p-2
                                font-semibold rounded-md transition-colors duration-150 hover:bg-emerald-500
                              hover:text-gray-700 border border-emerald-600"
                                >
                                    <Square size={15} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handlePlay(l.stationuuid)}
                                    className="flex items-center text-emerald-600 p-1 md:p-2
                                font-semibold rounded-md transition-colors duration-150 hover:bg-emerald-500
                              hover:text-gray-700 border border-emerald-600"
                                >
                                    <Play size={15} />
                                </button>
                            )}

                            <ModalPlayer
                                station={l}
                            />

                            <button
                                onClick={() => removeStation(l)}
                                className="p-1 md:p-2 transition-colors duration-150 border
                              border-red-700 rounded-md text-red-700 hover:bg-red-700 hover:text-gray-800"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </TableCell>
                </TableRow>
            ))}

        </tbody>
    )
}