import { useState } from "react";
import { MainContext } from "./contexts/mainContext";
import Content from "./content";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";
import DarkLight from "./DarkMode/dark-light";
import { LoadingProvider } from "./contexts/loadingContext";

function App() {
    const [activeMenu, setActiveMenu] = useState(false)
    return (
        <BrowserRouter>
            <div className="App">
                <MainContext.Provider value={{ activeMenu, setActiveMenu }}>
                        <DarkLight />
                        <Content />
                        <Sidebar />
                </MainContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
