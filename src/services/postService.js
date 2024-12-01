import Swal from "sweetalert2";
import { apAxios } from "../axios"

export const PostService = async (postData, setPostData) => {
    const res = await apAxios.post('/posts', postData)
    if (res) {
        Swal.fire({
            title: "اضافه شد!",
            text: `پست با موضوع "${res.data.title}" با موفقیت اضافه شد!`,
            icon: "success"
        });
        setPostData({
            title: '',
            category: ''
        })
    }
}
export const UpdatePostService = async (postData, postId) => {
    try {
        const res = await apAxios.put(`/posts/${postId}`, postData)
        if (res) {
            Swal.fire({
                title: "ویرایش شد!",
                text: `پست با موضوع "${res.data.title}" با موفقیت ویرایش شد!`,
                icon: "success"
            });
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