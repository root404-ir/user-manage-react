import { useNavigate } from "react-router"

const NavigateComponent = (MainComponent) => {
    const NewComponent = () => {
        const navigate = useNavigate()
        return (
            <MainComponent navigate={navigate} />
        )
    }
    return NewComponent
}
export default NavigateComponent