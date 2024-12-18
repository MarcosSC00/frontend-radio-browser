import * as Dialog from '@radix-ui/react-dialog'
import * as Visibility from '@radix-ui/react-visually-hidden'
import { Pen, X } from 'lucide-react'
import { CardStationDetails, CardStationDetailsProps } from './card-station-deteails'

interface ModalPlayerProps extends CardStationDetailsProps{}

export function ModalPlayer({station }: ModalPlayerProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger
                className="p-2 transition-colors duration-150 border
              border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-gray-800"
            >
                <Pen size={15} />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60">
                    <Dialog.DialogContent
                        className="w-[80%] max-w-[450px] absolute top-1/2 left-1/2 -translate-x-[50%] md:-translate-x-[25%] -translate-y-1/2"
                    >
                        <Visibility.Root>
                            <Dialog.Title/>
                            <Dialog.Description/>
                        </Visibility.Root>
                        <CardStationDetails station={station} />
                        <Dialog.Close
                            className="absolute top-0 right-0 p-1 text-gray-900 md:translate-x-1/2 md:-translate-y-1/2
                          bg-blue-700 md:rounded-full transition-colors duration-150 hover:bg-blue-800
                            md:border-2 md:border-gray-950"
                        >
                            <X />
                        </Dialog.Close>
                    </Dialog.DialogContent>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}