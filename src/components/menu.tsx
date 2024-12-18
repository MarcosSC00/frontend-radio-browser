import { Button, Drawer, IconButton } from "@material-tailwind/react";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { AsideBar } from "./aside-bar";

export function Menu() {
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => setIsOpen(true)
    const closeDrawer = () => setIsOpen(false)
    return (
        <>
            <Button onClick={openDrawer} className="p-2 text-gray-300">
                <AlignJustify size={25} />
            </Button>

            <Drawer 
                open={isOpen} onClose={closeDrawer} 
                className="fixed left-0 z-50 shadow-black/60 overflow-y-auto scrollbar
              scrollbar-track-slate-700 scrollbar-thumb-slate-600 bg-gray-800 w-[60%] p-2"
            >
                <IconButton
                    onClick={closeDrawer}
                    className="text-gray-300 p-5 rounded-none bg-gray-800"
                >
                    <X size={25}/>
                </IconButton>
                <AsideBar className={isOpen ? 'block w-full ' : 'hidden'} />
            </Drawer>
        </>
    )
}