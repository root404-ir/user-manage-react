import { createContext } from "react";

export const MainContext = createContext({
    activeMenu: false,
    setActiveMenu: () => { }
})