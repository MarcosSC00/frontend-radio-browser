import { ComponentProps } from "react";
import { TableHead } from "./table-head";
import { TableRow } from "./table-row";

interface TableHeaderProps extends ComponentProps<'thead'> { }

export function TableHeader(props: TableHeaderProps) {
    return (
        <thead {...props} className="py-3 px-4 text-sm font-semibold text-left bg-gray-800" >
            <TableRow>
                <TableHead>Nome da Rádio atual</TableHead>
                <TableHead className="text-center"></TableHead>
            </TableRow>
        </thead>
    )
}