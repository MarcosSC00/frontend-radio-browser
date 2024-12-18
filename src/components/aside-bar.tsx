import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import { CardGender } from "./card-gender";
import { Search } from "./search";
import { StationData } from "../interfaces/StationData";
import { Formatter, searchStation } from "../services/stations-services";
import { useFavStations } from "../context/fav-context";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface AsideBarProps extends ComponentProps<'aside'> { }

export function AsideBar({ className }: AsideBarProps) {

    const [stations, setStations] = useState<StationData[]>([])
    const [isSelected, setIsSelected] = useState<Record<string, boolean>>({})
    const [search, setSearch] = useState('')
    const { favStations, addStation } = useFavStations()
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(stations?.length / 10)

    useEffect(() => {
        async function getStations() {
            const result = await Formatter()
            if (result) {
                setStations(result)
            }
        }
        getStations()
    }, [])

    function addSelect(station: StationData) {
        const id = station.stationuuid
        setIsSelected((prevState) => ({ ...prevState, [id]: !prevState[id] }))
        addStation(station)
    }

    function onSearchInput(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    useEffect(() => {
        function verifySelect() {
            const favStationIds = new Set(favStations.map((fav) => fav.stationuuid))
            const updatedSelection = stations.reduce((acc, station) => {
                acc[station.stationuuid] = favStationIds.has(station.stationuuid)
                return acc;
            }, {} as Record<string, boolean>)

            setIsSelected(updatedSelection)
        }

        verifySelect()
    }, [favStations, stations])

    function goToNextPage() {
        setPage(page + 1)
    }

    function goToPreviousPage() {
        setPage(page - 1)
    }

    function goToFirstPage() {
        setPage(1)
    }

    function goToLastPage() {
        setPage(totalPages)
    }

    useEffect(() => {
        setStations(search != '' ? searchStation(search, favStations) :
            favStations)

    }, [search])

    return (
        <aside
            className={twMerge("w-64 overflow-y-auto z-20 bg-gray-800 flex-shrink-0 scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-600 py-5", className)}
        >
            <div className="py-4 text-gray-500 ">
                <Search
                    name={search}
                    onChange={onSearchInput}
                    className="px-2 mb-5"
                />
                <ul>
                    {stations || stations !== null ? (
                        stations.slice((page - 1) * 10, page * 10).map((l) => (
                            <li className="px-2 py-3" key={l.stationuuid}>
                                <CardGender
                                    addFav={() => addSelect(l)}
                                    name={l.name}
                                    isSelected={isSelected[l.stationuuid]}
                                    disabled={isSelected[l.stationuuid]}
                                />
                            </li>
                        ))
                    ) : (
                        <span />
                    )}
                </ul>

                <div className="w-full flex items-center justify-between">
                    <button
                        onClick={goToFirstPage}
                        disabled={page === 1}
                        className="disabled:text-black/50"
                    >
                        <ChevronsLeft className="w-5" />
                    </button>

                    <button
                        onClick={goToPreviousPage}
                        disabled={page === 1}
                        className="disabled:text-black/50"
                    >
                        <ChevronLeft className="w-5" />
                    </button>

                    <button
                        onClick={goToNextPage}
                        disabled={page === totalPages}
                        className="disabled:text-black/50"
                    >
                        <ChevronRight className="w-5" />
                    </button>

                    <button
                        onClick={goToLastPage}
                        disabled={page === totalPages}
                        className="disabled:text-black/50"
                    >
                        <ChevronsRight className="w-5" />

                    </button>
                </div>
            </div>
        </aside>
    )
}