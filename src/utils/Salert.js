import Swal from "sweetalert2"

export const Confirm = async (message) => {
    return Swal.fire({
        title: "حذف رکورد",
        text: message,
        icon: "warning",
        iconColor: "#FF5630",
        showCancelButton: true,
        confirmButtonColor: "#ff0101",
        cancelButtonColor: "#7401ff",
        cancelButtonText: 'نه پشیمون شدم',
        confirmButtonText: "آره پاکش کن",
        background: '#EBECF0'
    }).then(result => result.isConfirmed)
}
export const Alert = (title, message, icon) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        background: '#E3FCEF'
    });
}

