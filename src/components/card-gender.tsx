import { Check, Square } from "lucide-react";

interface CardGenderProps {
    isSelected: boolean,
    name: string,
    disabled?: boolean,
    addFav: () => void
}

export function CardGender({ isSelected, name, disabled, addFav }: CardGenderProps) {
    return (
        <div className="flex w-full items-center justify-between px-3 py-2 rounded-md bg-gray-600">
            <span className="text-gray-300 capitalize">
                {name}
            </span>
            {isSelected ? (
                <button className="text-blue-600" disabled={disabled}>
                    <Check />
                </button>
            ) : (
                <button onClick={addFav} >
                    <Square />
                </button>
            )}
        </div>
    )
}