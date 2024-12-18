import * as Dialog from '@radix-ui/react-dialog'
import * as Visibility from '@radix-ui/react-visually-hidden'
import { Search, SearchProps } from './search'
import { X } from 'lucide-react'

interface ModalSearchProps extends SearchProps { }

export function ModalSearch({ name, onChange }: ModalSearchProps) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-gray-950/60">
                <Dialog.DialogContent className="absolute top-10 left-1/2 -translate-x-1/2">
                
                    <Visibility.Root>
                        <Dialog.Title />
                        <Dialog.Description />
                    </Visibility.Root>

                    <div className="relative">
                        <Search name={name} onChange={onChange} />
                        <Dialog.Close
                            className="absolute bottom-0 left-1/2 p-1 rounded-full text-gray-900 
                        -translate-x-1/2 translate-y-[110%] bg-gray-500 transition-colors duration-150
                       hover:bg-gray-600"
                        >
                            <X size={20} />
                        </Dialog.Close>
                    </div>
                </Dialog.DialogContent>
            </Dialog.Overlay>
        </Dialog.Portal>
    )

}