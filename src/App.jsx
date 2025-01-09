import { useState } from "react";
import { MainContext } from "./contexts/mainContext";
import Content from "./content";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";
import PersianDate from "./date/persianDate";
import { SidebarProvider } from "./contexts/sidebarContext";
import ParticleBackground from "./Particle";
function App() {
    const [activeMenu, setActiveMenu] = useState(false)

    return (
        <BrowserRouter>
            <div className="App">
                <MainContext.Provider value={{ activeMenu, setActiveMenu }}>
                    <PersianDate />
                    <SidebarProvider>
                        <Content />
                        <Sidebar />
                    </SidebarProvider>
                </MainContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
