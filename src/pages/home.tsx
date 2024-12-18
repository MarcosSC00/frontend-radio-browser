import { SearchIcon } from "lucide-react";
import { AsideBar } from "../components/aside-bar";
import { Table } from "../components/table/table";
import { TableHeader } from "../components/table/table-header";
import { Search } from "../components/search";
import * as Dialog from "@radix-ui/react-dialog"
import { searchStation } from "../services/stations-services";
import { TableFoot } from "../components/table/table-foot";
import { TableBody } from "../components/table/table-body";
import { ChangeEvent, useEffect, useState } from "react";
import { ModalSearch } from "../components/modal-search";
import { StationData } from "../interfaces/StationData";
import { useFavStations } from "../context/fav-context";
import { Menu } from "../components/menu";

export function Home() {
    const [searchFav, setSearchFav] = useState('')
    const { favStations } = useFavStations()
    const [filteredFavs, setFilteredFavs] = useState<StationData[]>(favStations)
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(filteredFavs?.length / 10)

    function onSearchFavInput(event: ChangeEvent<HTMLInputElement>) {
        setSearchFav(event.target.value)
    }

    useEffect(() => {
        setFilteredFavs(searchFav != '' ? searchStation(searchFav, favStations) :
            favStations)

    }, [favStations, searchFav])

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


    return (
        <div className="flex h-screen bg-gray-900">
            <AsideBar className="hidden md:block" />
            <div className="w-full flex flex-col">
                <main
                    className="w-full overflow-y-auto scrollbar
                  scrollbar-track-slate-700 scrollbar-thumb-slate-600"
                >

                    <div className="container p-6 mx-auto relative">

                        <div className="flex md:hidden">
                            <Menu />
                        </div>

                        <h2 className="my-6 text-2xl font-medium text-gray-200 text-center">Radio Browser</h2>
                        <Dialog.Root>
                            <div className="w-full flex justify-between items-center my-2">
                                <h4 className="uppercase text-sm font-semibold text-gray-200">Favorites Radios</h4>
                                <div className="absolute top-0 right-0 p-6 text-blue-700 md:hidden">
                                    <Dialog.Trigger className="outline-none">
                                        <SearchIcon />
                                    </Dialog.Trigger>
                                    <ModalSearch
                                        name={searchFav}
                                        onChange={onSearchFavInput}
                                    />
                                </div>
                                <Search
                                    name={searchFav}
                                    onChange={onSearchFavInput}
                                    className="hidden md:flex" size="sm"
                                />
                            </div>

                        </Dialog.Root>

                        <div className="w-full overflow-hidden rounded-lg shadow-xl">
                            <Table>
                                <TableHeader />
                                {filteredFavs ? (
                                    <TableBody list={filteredFavs} page={page} />
                                ) : (
                                    <p>Nenhuma estação encontada.</p>
                                )}

                                <TableFoot
                                    page={page}
                                    totalPages={totalPages}
                                    goToFirstPage={goToFirstPage}
                                    goToNextPage={goToNextPage}
                                    goToPreviousPage={goToPreviousPage}
                                    goToLastPage={goToLastPage}
                                />
                            </Table>
                        </div>

                    </div>

                </main>

            </div>
        </div>
    )
}