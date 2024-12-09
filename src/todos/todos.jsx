import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apAxiosV2 } from "../axios";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

import InfoSoundTask from "../assets/sounds/info.mp3"
import DeleteSoundTask from "../assets/sounds/swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3"
import TextBg from "../text-bg";
const Todos = () => {
    const [todos, setTodos] = useState([])
    const [mainTodos, setMainTodos] = useState([])
    const navigate = useNavigate()
    const DeleteSoundRef = useRef(new Audio(DeleteSoundTask))
    const InfoSoundRef = useRef(new Audio(InfoSoundTask))
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
        })
    }, [])
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
                <TextBg />
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
                                اضافه کردن کار جدید
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            {todos.length ? (
                <div>
                    <table className="table table-striped shadow overflow-hidden bg-light rounded-3 mt-4">
                        <thead>
                            <tr className="table-info">
                                <td>#</td>
                                <td>عنوان</td>
                                <td>وضعیت</td>
                                <td>عملیات</td>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {todos.map(t => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td><span className={`${t.isDone ? 'bg-success' : 'bg-danger'} py-0 px-2 text-white rounded-5`}>
                                        {t.isDone ? 'انجام شده' : 'انجام نشده'}
                                    </span></td>
                                    <td>
                                        <i
                                            className={`${t.isDone ? 'fa fa-close text-warning' : 'fa fa-check text-success'} mx-2 pointer`}
                                            title={`${t.isDone ? 'از حالت انجام شده خارج کن' : 'انجام دادم'}`}
                                            onClick={() => handleDoneTask(t.id)} ></i>
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