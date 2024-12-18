import { ComponentProps } from "react";

interface TableProps extends ComponentProps<'table'> { }

export function Table(props: TableProps) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full" {...props} />
        </div>
    )
}