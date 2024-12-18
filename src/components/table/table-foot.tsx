import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface TableFootProps {
    totalPages: number,
    page: number,
    goToFirstPage: () => void,
    goToPreviousPage: () => void,
    goToNextPage: () => void,
    goToLastPage: () => void,
}

export function TableFoot({ page, totalPages, goToFirstPage, goToPreviousPage, goToNextPage, goToLastPage }: TableFootProps) {

    return (
        <tfoot className="bg-gray-800">
            <TableRow>
                <TableCell colSpan={1} className="text-gray-400">
                    <span className="ml-3">página 1 de {totalPages}</span>
                </TableCell>
                <TableCell colSpan={1} className="text-left text-gray-400">
                    <div className="flex justify-end">
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
                </TableCell>
            </TableRow>
        </tfoot>
    )
}