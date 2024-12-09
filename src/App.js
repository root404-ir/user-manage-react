import { useState } from "react";
import { MainContext } from "./contexts/mainContext";
import Content from "./content";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";
import DarkLight from "./DarkMode/dark-light";
import PersianDate from "./date/persianDate";

function App() {
    const [activeMenu, setActiveMenu] = useState(false)
    return (
        <BrowserRouter>
            <div className="App">
                <MainContext.Provider value={{ activeMenu, setActiveMenu }}>
                    <PersianDate />
                    <Content />
                    <Sidebar />
                </MainContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
