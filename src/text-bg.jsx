import './style.css'
import TextBG from './assets/text-bg.png'
import darkTextBG from './assets/text-bg-dark.jpg'
const TextBg = ({ darkMode }) => {
    return (
        <div className="text-bg">
            <img src={darkMode ? darkTextBG : TextBG} alt="" />
        </div>
    )
}
export default TextBg