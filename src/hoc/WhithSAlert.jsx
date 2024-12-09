import Swal from "sweetalert2"

const Salert = (MainComponent) => {
    const NewComponent = (props) => {
        const Confirm = (message) => {
            Swal.fire({
                title: "حذف رکورد",
                text: message,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "آره پاکش کن",
            })
        }

        const Alert = (message, icon) => {
            return Swal.fire({
                title: "موفقیت آمیز!",
                text: message,
                icon: icon
            });

        }
        return (
            <MainComponent {...props} Confirm={Confirm} Alert={Alert}></MainComponent>
        )
    }
    return NewComponent
}
export default Salert