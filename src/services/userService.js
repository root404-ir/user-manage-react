import { apAxios } from "../axios"
import Swal from "sweetalert2";

export const userService = async (data, setData) => {
    const res = await apAxios.post('/users', data)
    if (res) {
        Swal.fire({
            title: "اضافه شد!",
            text: `کاربر "${res.data.name}" با موفقیت اضافه شد!`,
            icon: "success"
        });
        setData({
            name: '',
            username: '',
            email: '',
            address: {
                street: '',
                city: '',
                suite: '',
                zipcode: ''
            }
        })
    }
}

export const updateUserService = async (data, userId) => {
    try {
        const res = await apAxios.put(`/users/${userId}`, data)
        if (res) {
            Swal.fire({
                title: "ویرایش شد!",
                text: `کاربر "${res.data.name}" با موفقیت ویرایش شد!`,
                icon: "success"
            })
        }
    }
    catch (err) {
        console.log(err);
        Swal.fire({
            title: "خطا!",
            text: "مشکلی در ویرایش کاربر پیش آمد. لطفاً دوباره تلاش کنید.",
            icon: "error"
        })
    }
}