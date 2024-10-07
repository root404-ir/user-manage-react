import React, { useContext } from "react"
import { Route, Routes} from "react-router-dom";
import Users from "./users/users"
import './style.modules.css'
import { MainContext } from "./contexts/mainContext"
import Todos from "./todos/todos";
import Posts from "./posts/posts";
import Gallery from "./gallery/gallery";

const Content = () => {
    const { activeMenu, setActiveMenu } = useContext(MainContext)
    const handleShowMenu = (event) => {
        event.stopPropagation()
        setActiveMenu(!activeMenu)
    }
    return (
        <div className="content_section" onClick={() => { setActiveMenu(false) }}>
            <i className="menu_button fas fa-bars text-dark m-2 pointer" onClick={handleShowMenu}></i>
                <Routes>
                    <Route path='/' element={<Users/>}/>
                    <Route path='/posts' element={<Posts/>}/>
                    <Route path='/gallery' element={<Gallery/>}/>
                    <Route path='/todos' element={<Todos/>}/>
                </Routes>
        </div>
    )
}
export default Content