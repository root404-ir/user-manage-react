import axios from "axios"
import { useEffect, useRef, useState } from "react"
import './gallery.css'
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { apAxiosV2 } from "../axios"
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import WarningSound from "../assets/sounds/error-call-to-attention-129258.mp3"
import DeleteSound from "../assets/sounds/swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3"
const Gallery = () => {

    const navigate = useNavigate()
    const [gallery, setGallery] = useState([])
    const warningSoundRef = useRef(new Audio(WarningSound))
    const deleteSoundRef = useRef(new Audio(DeleteSound))
    const [mainGallery, setMainGallery] = useState([])
    const warningSound = () => {
        warningSoundRef.current.play()
    }
    const deleteSound = () => {
        deleteSoundRef.current.play()
    }
    useEffect(() => {
        apAxiosV2.get('/gallery').then(res => {
            setGallery(res.data)
            setMainGallery(res.data)
        })
    }, [])
    const handleSearchGallery = (e) => {
        setGallery(mainGallery.filter(g => g.title.includes(e.target.value)))
    }
    const handleDeleteGallery = (galleryId) => {
        warningSound()
        Swal.fire({
            title: "حذف رکورد",
            text: `آیا از حذف رکورد ${galleryId} اطمینان دارید؟`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "آره پاکش کن"
        }).then(result => {
            if (result.isConfirmed) {
                apAxiosV2.delete(`/gallery/${galleryId}`).then(res => {
                    if (res.status === 200) {
                        let newGallery = gallery.filter(g => g.id !== galleryId)
                        setGallery(newGallery)
                        Swal.fire({
                            title: "موفقیت آمیز!",
                            text: "آیتم انتخابی شما با موفقیت حذف شد",
                            icon: "success"
                        });
                    }
                    deleteSound()
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
    return (
        <div className='mt-5 container-fluid p-4'>
            <h4 className='text-center fs-2 fw-bold'>مدیریت گالری</h4>
            <div className=' my-4 mx-0 d-flex container-fluid justify-content-between align-items-center'>
                <div className="form-group p-0 d-flex gap-3">
                    <input type="text" className="form-control shadow" placeholder="جستجو" onChange={handleSearchGallery} />
                </div>
                <div>
                    <div className="text-start px-0">
                        <Link to={'/gallery/add'} className="btn btn-success">
                            <span className="d-flex align-items-center gap-2">
                                <i className="btn_plus_icon fas fa-plus text-light"></i>
                                اضافه کردن عکس جدید
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            {gallery.length ? (
                <table className="table table-striped bg-light shadow overflow-hidden rounded-3 mt-4">
                    <thead>
                        <tr className="table-info">
                            <td>#</td>
                            <td>عنوان</td>
                            <td>عکس</td>
                            <td>دانلود</td>
                            <td>عملیات</td>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {gallery.map(g => (
                            <tr key={g.id} className="td_gallery">
                                <td>{g.id}</td>
                                <td>{g.title}</td>
                                <td>
                                    <img src={g.url} alt="عکس" width={100} height={100} />
                                </td>
                                <td>
                                    <a href={g.url} className="btn btn-info" target="blank">
                                        دانلود عکس
                                    </a>
                                </td>
                                <td>
                                    <FaEdit className="text-warning mx-2 pointer" onClick={() => navigate(`add/${g.id}`)}></FaEdit>
                                    <IoTrashBin className="text-danger mx-2 pointer" onClick={() => handleDeleteGallery(g.id)}></IoTrashBin>
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
        </div>
    )
}
export default Gallery