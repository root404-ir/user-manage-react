import React, { useContext } from "react"
import style from './style.modules.css'
import { MainContext } from "./contexts/mainContext"
import {Link} from "react-router-dom";
const Sidebar = () => {
    const { activeMenu, setActiveMenu } = useContext(MainContext)
    return (
        <div className="sidebar_section bg-secondary" style={activeMenu ? { right: 0 } : {}}>
            <ul className="sidebar_list m-0 p-0">
                <li className="sidebar_avatar">
                    <img src="./assets/images/androgynous-avatar-non-binary-queer-person_prev_ui.png" alt="" />
                </li>
                <li>
                    <i className='fas fa-user text-white ms-2'></i>
                    <Link to="/">کاربران</Link>
                </li>
                <li>
                    <i className='fas fa-notes-medical ms-2'></i>
                    <Link to="/posts">پست ها</Link>
                </li>
                <li>
                    <i className='fas fa-images ms-2'></i>
                    <Link to="/gallery">گالری</Link>
                </li>
                <li>
                    <i className='fas fa-tasks ms-2'></i>
                    <Link to="/todos">کارها</Link>
                </li>
            </ul>
        </div >
    )
}
export default Sidebar