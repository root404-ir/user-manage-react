import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
    const [isSideClose, setIsSideClose] = useState(
        () => JSON.parse(localStorage.getItem('isSideClose')) ?? false
    )
    const SideClose = () => {
        const newStatus = !isSideClose
        setIsSideClose(newStatus)
        localStorage.setItem('isSideClose', JSON.stringify(newStatus))
    }
    return (
        <SidebarContext.Provider value={{ isSideClose, SideClose }}>
            {children}
        </SidebarContext.Provider>
    )

}
export const useSidebar = () => useContext(SidebarContext);
