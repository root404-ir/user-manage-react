import { useState } from "react"
import Swal from "sweetalert2"
import { apAxios } from "../axios"


const WithGroupAction = (WrappedComponent) => {
    const NewComponent = (props) => {
        const [selectedItems, setSelectedItems] = useState([])

        const handleSelectItems = (id) => {
            setSelectedItems(prev =>
                prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
            )
        }

        const handleGroupAction = (operation, items, updateData) => {
            if (operation === "delete" && selectedItems.length) {
                Swal.fire({
                    title: "حذف گروهی",
                    text: `آیا از حذف این ${items.length} آیتم اطمینان دارید؟`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "آره پاکش کن",
                }).then(result => {
                    if (result.isConfirmed) {
                        const deletePromise = items.map(id => apAxios.delete(`/posts/${id}`))
                        Promise.all(deletePromise)
                            .then(() => {
                                updateData(prevData =>
                                    prevData.filter(item => !items.includes(item.id))
                                )
                                setSelectedItems([])
                                Swal.fire({
                                    title: "موفقیت آمیز!",
                                    text: "آیتم‌های انتخابی با موفقیت حذف شدند",
                                    icon: "success",
                                })
                            }).catch(() => {
                                Swal.fire({
                                    title: "خطا!",
                                    text: "مشکلی در حذف داده‌ها پیش آمد",
                                    icon: "error",
                                })
                            })
                    }
                })
            }
        }
        return (
            <WrappedComponent {...props} selectedItems={selectedItems} onSelectedItems={handleSelectItems} onGroupAction={handleGroupAction} />
        )
    }
    return NewComponent
}
export default WithGroupAction