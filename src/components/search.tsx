import { SearchIcon } from "lucide-react";
import { ChangeEvent, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants"

const search = tv({
    base: "border pl-8 text-gray-300 border-white/10 w-full rounded-sm outline-none bg-gray-600",
    variants: {
        size: {
            default: "py-2",
            sm: "py-0"
        }
    },
    defaultVariants: {
        size: 'default'
    }
})

export interface SearchProps extends ComponentProps<'div'>, VariantProps<typeof search> {
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Search({ className, size, name, onChange }: SearchProps) {
    return (
        <div className={twMerge("relative flex items-center max-w-[20rem]", className)}>
            <input
                type="text"
                placeholder="pesquisar..."
                value={name}
                onChange={onChange}
                className={search({ size })}
            />
            <div className="absolute flex justify-center items-center top-0 bottom-0 pl-2 text-gray-200">
                <SearchIcon size={16} />
            </div>
        </div>
    )
}