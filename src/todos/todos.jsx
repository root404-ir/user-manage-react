import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apAxiosV2 } from "../axios";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import InfoSoundTask from "../assets/sounds/info.mp3"
import DeleteSoundTask from "../assets/sounds/swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3"
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import gsap from "gsap";
const Todos = () => {
    const [todos, setTodos] = useState([])
    const [mainTodos, setMainTodos] = useState([])
    const navigate = useNavigate()
    const DeleteSoundRef = useRef(new Audio(DeleteSoundTask))
    const InfoSoundRef = useRef(new Audio(InfoSoundTask))
    const [selectedItems, setSelectedItems] = useState([])
    const [operation, setOperation] = useState('')
    const DeleteSound = () => {
        DeleteSoundRef.current.play()
    }
    const InfoSound = () => {
        InfoSoundRef.current.play()
    }
    useEffect(() => {
        apAxiosV2.get('/tasks',).then(res => {
            setTodos(res.data)
            setMainTodos(res.data)
            gsap.timeline()
                .to('#todo_table', { x: 0 })
                .from('#table-content', { opacity: 0 }, "+=0.4")
        })
    }, [])
    const handleSelectItems = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const handleGroupAction = () => {
        if (operation === 'delete' && selectedItems.length) {
            Swal.fire({
                title: "حذف گروهی",
                text: `آیا از حذف این ${selectedItems.length} آیتم اطمینان دارید؟`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "آره پاکش کن",
            }).then(result => {
                if (todos.length === 1) {
                    Swal.fire({
                        title: "",
                        text: "حداقل باید یک آیتم باقی بماند",
                        icon: "info"
                    });
                }
                if (result.isConfirmed && todos.length > 1) {
                    const deletePromise = selectedItems.map(id => apAxiosV2.delete(`/tasks/${id}`))
                    Promise.all(deletePromise)
                        .then(() => {
                            setTodos(prevData =>
                                prevData.filter(item => !selectedItems.includes(item.id))
                            )
                            setSelectedItems([])
                            Swal.fire({
                                title: "موفقیت آمیز!",
                                text: "آیتم‌های انتخابی با موفقیت حذف شدند",
                                icon: "success",
                            }).catch(() => {
                                Swal.fire({
                                    title: "خطا!",
                                    text: "مشکلی در حذف داده‌ها پیش آمد",
                                    icon: "error",
                                })
                            })
                        })
                }
            })
        }
    }
    const handleDoneTask = (taskId) => {
        const index = todos.findIndex(t => t.id === taskId)
        let newTaskItem = [...todos]
        newTaskItem[index].isDone = !newTaskItem[index].isDone
        setTodos(newTaskItem)
    }
    const handleDeleteTask = (taskId) => {
        InfoSound()
        Swal.fire({
            title: "حذف رکورد",
            text: `آیا از حذف رکورد ${taskId} اطمینان دارید؟`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "آره پاکش کن"
        }).then(result => {
            if (result.isConfirmed) {
                apAxiosV2.delete(`/tasks/${taskId}`).then(res => {
                    if (res.status === 200) {
                        let newTask = todos.filter(t => t.id !== taskId)
                        setTodos(newTask)
                    }
                    DeleteSound()
                    Swal.fire({
                        title: "موفقیت آمیز!",
                        text: "آیتم انتخابی شما با موفقیت حذف شد",
                        icon: "success"
                    });
                }).catch(() => {
                    Swal.fire({
                        title: "خطا!",
                        text: "مشکلی در حذف داده پیش آمد",
                        icon: "error",
                    })
                })
            }
        })
    }
    const handleSearchTodos = (e) => {
        setTodos(mainTodos.filter(t => t.title.includes(e.target.value)))
    }
    return (
        <div className='mt-5 container-fluid p-4'>
            <div className="d-flex justify-content-center">
                <h4 className='user-manaege-header-text d-inline-block fs-2 fw-bold'>مدیریت کار ها</h4>
            </div>
            <div className=' my-4 mx-0 d-flex container-fluid justify-content-between align-items-center'>
                <div className="form-group p-0 d-flex gap-3">
                    <input type="text" className="form-control shadow" placeholder="جستجو" onChange={handleSearchTodos} />
                </div>
                <div>
                    <div className="text-start px-0">
                        <Link to={'/todos/add'} className="btn btn-success">
                            <span className="d-flex align-items-center gap-2">
                                <FaPlus className="btn_plus_icon text-light" />
                                <span className="text-add">اضافه کردن کار جدید</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between my-4">
                <select className="form-select w-auto" value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="">انتخاب عملیات</option>
                    <option value="delete">حذف</option>
                </select>
                <button className="btn btn-danger d-flex align-items-center gap-1"
                    onClick={() => handleGroupAction('delete')}
                >
                    <MdOutlineAutoFixHigh />
                    انجام عملیات
                </button>
            </div>
            {todos.length ? (
                <div>
                    <table id="todo_table" className="table table-striped shadow overflow-hidden bg-light rounded-3 mt-4" style={{ transform: 'translateX(4500px)' }}>
                        <thead>
                            <tr className="table-info">
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>#</td>
                                <td>عنوان</td>
                                <td>وضعیت</td>
                                <td>عملیات</td>
                            </tr>
                        </thead>
                        <tbody id="table-content" className="table-group-divider">
                            {todos.map(t => (
                                <tr key={t.id}>
                                    <td>
                                        <input type="checkbox"
                                            checked={selectedItems.includes(t.id)}
                                            onChange={() => handleSelectItems(t.id)}
                                        />
                                    </td>
                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td><span className={`${t.isDone ? 'bg-success' : 'bg-danger'} py-0 px-2 text-white rounded-5`}>
                                        {t.isDone ? 'انجام شده' : 'انجام نشده'}
                                    </span></td>
                                    <td>
                                        <span onClick={() => handleDoneTask(t.id)} className="mx-2">
                                            {t.isDone ? <MdOutlineClose className="text-warning" /> : <FaCheck className="text-success" />}
                                        </span>
                                        <FaEdit className=" text-warning mx-2 pointer" title="ویرایش" onClick={() => navigate(`/todos/add/${t.id}`)} />
                                        <IoTrashBin className="text-danger mx-2 pointer" title="حذف" onClick={() => handleDeleteTask(t.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="d-flex justify-content-center flex-column align-items-center gap-5 h-50">
                    <img src="/assets/gif/g0R9.gif" alt="" className="preloader" />
                    <p className="fs-2">در حال بارگزاری داده ها ...</p>
                </div>
            )
            }
        </div >
    )
}
export default Todos