import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { apAxios } from "../axios"
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import soundFile from "../assets/sounds/info.mp3"
import DeleteSound from "../assets/sounds/swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3"

const Posts = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const audioRef = useRef(new Audio(soundFile))
    const deleteSoundRef = useRef(new Audio(DeleteSound))
    const [mainPosts, setMainPosts] = useState([])
    const [selectPosts, setSelectPosts] = useState([])
    const [operation, setOperation] = useState('')
    const infoSound = () => {
        audioRef.current.play()
    }
    const deleteSound = () => {
        deleteSoundRef.current.play()
    }
    useEffect(() => {
        apAxios.get('/api/v1/posts').then(res => {
            setPosts(res.data)
            setMainPosts(res.data)
        })
    }, [])
    const handleSearchPosts = (e) => {
        setPosts(mainPosts.filter(p => p.title.includes(e.target.value)))
    }
    const handleSearchPostsCategory = (e) => {
        setPosts(mainPosts.filter(p => p.category.includes(e.target.value)))
    }
    const handleDeletePost = (postId) => {
        infoSound()
        Swal.fire({
            title: "حذف رکورد",
            text: `آیا از حذف رکورد ${postId} اطمینان دارید؟`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "آره پاکش کن"
        }).then(result => {
            if (result.isConfirmed) {
                apAxios.delete(`/posts/${postId}`).then(res => {
                    if (res.status === 200) {
                        let newPost = posts.filter(p => p.id !== postId)
                        setPosts(newPost)
                        Swal.fire({
                            title: "موفقیت آمیز!",
                            text: "آیتم انتخابی شما با موفقیت حذف شد",
                            icon: "success"
                        });
                        deleteSound()
                    }
                }).catch(error => {
                    Swal.fire({
                        title: "خطا!",
                        text: "مشکلی در حذف داده پیش آمد",
                        icon: "error"
                    })
                })
            }
        })
    }
    const handleSelectPost = (id) => {
        setSelectPosts(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        )
    }
    const handleGroupAction = () => {
        if (operation === 'delete' && selectPosts.length) {
            infoSound()
            Swal.fire({
                title: "حذف گروهی",
                text: `آیا از حذف این ${selectPosts.length} آیتم اطمینان دارید؟`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "آره پاکش کن"
            }).then(result => {
                if (result.isConfirmed) {
                    const deletePromises = selectPosts.map(postId =>
                        apAxios.delete(`/posts/${postId}`)
                    )
                    Promise.all(deletePromises).then(() => {
                        const newPosts = posts.filter(p => !selectPosts.includes(p.id))
                        setPosts(newPosts)
                        setSelectPosts([])
                        Swal.fire({
                            title: "موفقیت آمیز!",
                            text: "آیتم‌های انتخابی با موفقیت حذف شدند",
                            icon: "success"
                        });
                        deleteSound()
                    }).catch(err => {
                        Swal.fire({
                            title: "خطا!",
                            text: "مشکلی در حذف داده‌ها پیش آمد",
                            icon: "error"
                        });
                    })
                } else {
                    Swal.fire({
                        title: "خطا!",
                        text: "عملیات یا آیتم‌های انتخابی مشخص نشده‌اند",
                        icon: "error"
                    });
                }
            })
        }
    }
    return (
        <div className='mt-5 container-fluid p-4'>
            <h4 className='text-center fs-2 fw-bold'>مدیریت پست ها</h4>
            <div className=' my-4 mx-0 p-0 d-flex container-fluid justify-content-between align-items-center'>
                <div className="form-group p-0 d-flex gap-3">
                    <input type="text" className="form-control shadow" placeholder="جستجو بر اساس موضوع" onChange={handleSearchPosts} />
                    <input type="text" className="form-control shadow" placeholder="جستجو بر اساس دسته بندی" onChange={handleSearchPostsCategory} />
                </div>
                <div>
                    <div className="text-start px-0">
                        <Link to={'/posts/add'} className="btn btn-success">
                            <span className="d-flex align-items-center gap-2">
                                <i className="btn_plus_icon fas fa-plus text-light"></i>
                                اضافه کردن پست جدید
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
                <button className="btn btn-danger d-flex align-items-center gap-1" onClick={handleGroupAction}>
                    <MdOutlineAutoFixHigh />
                    انجام عملیات
                </button>
            </div>
            {posts.length ? (
                <table className="table table-striped bg-light shadow overflow-hidden rounded-3 mt-4">
                    <thead>
                        <tr className="table-info">
                            <td>
                                <input type="checkbox"
                                    onChange={(e) => setSelectPosts(e.target.checked ? posts.map(p => p.id) : [])}
                                    checked={selectPosts.length === posts.length}
                                />
                            </td>
                            <td>#</td>
                            <td>موضوع</td>
                            <td>دسته بندی</td>
                            <td>عملیات</td>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {posts.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <input type="checkbox"
                                        checked={selectPosts.includes(p.id)}
                                        onChange={()=>handleSelectPost(p.id)}
                                    />
                                </td>
                                <td>{p.id}</td>
                                <td>{p.title}</td>
                                <td>
                                    <span className="  py-0 px-2 shadow-sm border-bottom border-secondary border-4 text-black rounded-2">{p.category}</span>
                                </td>
                                <td>
                                    <FaEdit className="text-warning mx-2 pointer" onClick={() => navigate(`/posts/add/${p.id}`)}></FaEdit>
                                    <IoTrashBin className="text-danger mx-2 pointer" onClick={() => handleDeletePost(p.id)}></IoTrashBin>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="d-flex justify-content-center flex-column align-items-center gap-5 h-50">
                    <img src="/assets/gif/g0R9.gif" alt="" className="preloader" />
                    <p className="fs-2">در حال بارگزاری داده ها ...</p>
                </div>
            )}
        </div >
    )
}
export default Posts
