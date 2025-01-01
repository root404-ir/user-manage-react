import { useEffect, useState } from "react"
import './dark-light.css';
const DarkLight = () => {
    const [mode, setMode] = useState('system')
    useEffect(() => {
        const saveMode = localStorage.getItem('themeMode') || 'system'
        setMode(saveMode)
    }, [])
    useEffect(() => {
        localStorage.setItem('themeMode', mode)
        const applyTheme = (theme) => {
            document.body.classList.remove('dark-bg', 'text-light', 'light-bg', 'text-dark')
            if (theme === 'dark') {
                document.body.classList.add('dark-bg', 'text-light')
            } else if (theme === 'light') {
                document.body.classList.add('light-bg', 'text-black')
            }
        }
        if (mode === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme:dark)')
            applyTheme(prefersDark.matches ? 'dark' : 'light')

            const handleSystemChange = (e) => {
                applyTheme(e.matches ? 'dark' : 'light')
            }
            prefersDark.addEventListener('change', handleSystemChange)

            return () => prefersDark.removeEventListener('change', handleSystemChange)
        } else {
            applyTheme(mode)
        }
    }, [mode])
    const handleChange = (e) => {
        setMode(e.target.value)
    }
    return (
        <div className="darkMode-Container">
            <div className="container-fluid">
                <select className="form-select mt-2" onChange={handleChange} value={mode}>
                    <option value="dark">حالت تاریک</option>
                    <option value="light">حالت روشن</option>
                    <option value="system">سیستم</option>
                </select>
            </div>
        </div >
    )
}
export default DarkLight
