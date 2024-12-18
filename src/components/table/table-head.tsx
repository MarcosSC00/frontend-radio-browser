import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeadProps extends ComponentProps<'th'>{}

export function TableHead({className, ...props}: TableHeadProps){
    return (
        <th {...props} className={twMerge("px-4 py-3 text-sm font-semibold uppercase text-gray-400", className)}/>
    )
}