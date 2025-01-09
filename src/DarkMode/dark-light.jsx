import { useEffect, useRef, useState } from "react";
import './dark-light.css';
import { LuLightbulb } from "react-icons/lu";
import { LuLightbulbOff } from "react-icons/lu";
import lightSwitchSound from '../assets/sounds/light-switch-flip-272436.mp3'


const DarkLight = () => {
    const iconStyle = {
        fontSize: '2.5rem',
    };

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true"
    })

    const lightSound = useRef(new Audio(lightSwitchSound))

    const handleDarkMode = () => {
        const newMode = !darkMode
        setDarkMode(newMode)
        localStorage.setItem("darkMode", newMode)

        if (newMode) {
            document.body.classList.add('dark-bg', 'text-light')
            document.body.classList.remove('light-bg', 'text-dark')
        } else {
            document.body.classList.add('light-bg', 'text-dark')
            document.body.classList.remove('dark-bg', 'text-light')
        }
        if(lightSound.current)
        {
            lightSound.current.play()
        }
    }

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-bg', 'text-light')
            document.body.classList.remove('light-bg', 'text-dark')
        } else {
            document.body.classList.add('light-bg', 'text-dark')
            document.body.classList.remove('dark-bg', 'text-light')
        }
    }, [darkMode])


    return (
        <div className="darkMode-Container">
            <div className="container-fluid">
                <span className="pointer" onClick={handleDarkMode}>
                    {darkMode ? <LuLightbulb style={iconStyle} /> : <LuLightbulbOff style={iconStyle} />}
                </span>
            </div>
        </div>
    );
};

export default DarkLight;
