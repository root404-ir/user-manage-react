import React, { useContext } from "react"
import './style.css'
import { MainContext } from "./contexts/mainContext"
import { NavLink } from "react-router-dom";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import avatar from './assets/icons8-eingekreist-benutzer-männlich-hauttyp-5-48.png'
import { useSidebar } from "./contexts/sidebarContext";
const Sidebar = () => {
    const { activeMenu, setActiveMenu } = useContext(MainContext)
    const { SideClose, isSideClose } = useSidebar()
    return (
        <div>
            <div className="test d-flex align-items-center justify-content-between sidebar-close-toggle text-white">
                <span className="fs-6">مدیریت کاربران</span>
                <span onClick={SideClose}>
                    {isSideClose ? <BsToggle2On title="باز کردن سایدبار"/> : <BsToggle2Off title="بستن سایدبار"/>}
                </span>
            </div>
            <div className={isSideClose ? 'close' : ''}>
                <div id="sidebar" className="sidebar_section  bg-secondary" style={activeMenu ? { right: 0 } : {}}>
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
            </div>
        </div>
    )
}
export default Sidebar