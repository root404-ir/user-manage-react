import Swal from "sweetalert2";
import { apAxiosV2 } from "../axios"

export const TaskService = async (taskData, setTaskData) => {
    const res = await apAxiosV2.post('/tasks', taskData)
    if (res) {
        Swal.fire({
            title: "اضافه شد!",
            text: `کار با موضوع "${res.data.title}" با موفقیت اضافه شد!`,
            icon: "success",
            backdrop: `
                    rgba(0,0,123,0.4)
                `,
        });
        setTaskData({
            title: ''
        })
    }
}

export const UpdateTaskService = async (taskData, taskId) => {
    try {
        const res = await apAxiosV2.put(`/tasks/${taskId}`, taskData)
        if (res) {
            Swal.fire({
                title: "ویرایش شد!",
                text: `کار با موضوع "${res.data.title}" با موفقیت ویرایش شد!`,
                icon: "success"
            })
        }
    }
    catch (err) {
        console.error(err)
        Swal.fire({
            title: "خطا!",
            text: "مشکلی در ویرایش کاربر پیش آمد. لطفاً دوباره تلاش کنید.",
            icon: "error"
        });
    }
}
export const GetIdTaskService = async (taskId, setTaskData, setLoading) => {
    const res = await apAxiosV2.get(`/tasks/${taskId}`)
    if (res) {
        setTaskData({
            title: res.data.title
        })
        setLoading(false)
    }
}