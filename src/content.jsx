import React, { useContext } from "react"
import { Route, Routes } from "react-router-dom";
import './style.css'
import { MainContext } from "./contexts/mainContext"
import Users from "./users/users"
import Todos from "./todos/todos";
import Posts from "./posts/posts";
import Gallery from "./gallery/gallery";
import ErrPage from "./404/404";
import Adduser from "./users/addUser"
import AddPost from "./posts/addPost";
import AddGallery from "./gallery/addGallery";
import AddTodos from "./todos/addTodos";
import { LoadingProvider } from "./contexts/loadingContext";
import DarkLight from "./DarkMode/dark-light";
import { useSidebar } from "./contexts/sidebarContext";
const Content = () => {
    const { activeMenu, setActiveMenu } = useContext(MainContext)
    const { SideClose, isSideClose } = useSidebar()
    const handleShowMenu = (event) => {
        event.stopPropagation()
        setActiveMenu(!activeMenu)
    }
    return (
        <div className={`content_section ${isSideClose ? 'w-100' : ''}`} onClick={() => {
            setActiveMenu(false)
        }}>
            <i className="menu_button text-align-center fas fa-bars text-dark m-2 pointer" onClick={handleShowMenu}></i>
            <LoadingProvider>
                <DarkLight />
                <Routes>
                    <Route path='/' element={<Users />} />
                    <Route path='/addUser' element={<Adduser />}>
                        <Route path=":userId" />
                    </Route>
                    <Route path='/addUser/edit' element={<Adduser />}>
                        <Route path=":userId" />
                    </Route>
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/posts/add' element={<AddPost />}>
                        <Route path=":postId" />
                    </Route>
                    <Route path='/gallery' element={<Gallery />} />
                    <Route path='/gallery/add' element={<AddGallery />}>
                        <Route path=":galleryId" />
                    </Route>
                    <Route path='/todos' element={<Todos />} />
                    <Route path='/todos/add' element={<AddTodos />}>
                        <Route path=":taskId" />
                    </Route>
                    <Route path='*' element={<ErrPage />} />
                </Routes>
            </LoadingProvider>
        </div >
    )
}
export default Content