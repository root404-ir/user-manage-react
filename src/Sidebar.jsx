import React, { useContext } from "react"
import './style.css'
import { MainContext } from "./contexts/mainContext"
import { NavLink } from "react-router-dom";
import avatar from './assets/androgynous-avatar-non-binary-queer-person_prev_ui.png'
import DarkLight from "./DarkMode/dark-light";
const Sidebar = () => {
    const { activeMenu, setActiveMenu } = useContext(MainContext)
    return (
        <div className="sidebar_section bg-secondary" style={activeMenu ? { right: 0 } : {}}>
            <ul className="sidebar_list m-0 p-0">
                <li className="sidebar_avatar">
                    <img src={avatar} alt="" />
                </li>
                <li>
                    <i className='fas fa-user text-white ms-2'></i>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'active-link' : ''}>
                        کاربران
                    </NavLink>
                </li>
                <li>
                    <i className='fas fa-notes-medical ms-2'></i>
                    <NavLink to='/posts' className={({ isActive }) => isActive ? 'active-link' : ''}>
                        پست ها
                    </NavLink>
                </li>
                <li>
                    <i className='fas fa-images ms-2'></i>
                    <NavLink to='/gallery' className={({ isActive }) => isActive ? 'active-link' : ''}>
                        گالری
                    </NavLink>
                </li>
                <li>
                    <i className='fas fa-tasks ms-2'></i>
                    <NavLink to='/todos' className={({ isActive }) => isActive ? 'active-link' : ''}>
                        کارها
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar