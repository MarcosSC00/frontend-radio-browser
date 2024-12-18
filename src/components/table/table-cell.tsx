import { ComponentProps } from "react";

interface TableCellProps extends ComponentProps<'td'> { }

export function TableCell(props: TableCellProps) {
    return (
        <td {...props} className="px-4 py-4 text-sm text-zinc-300" />
    )
}