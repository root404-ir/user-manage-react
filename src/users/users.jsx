import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../style.css'
import TextBg from "../text-bg";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import Salert from "../hoc/WhithSAlert";
const Users = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [mainUsers, setMainUsers] = useState([])
    const { Confirm, Alert } = props
    useEffect(() => {
        axios.get('https://6720dd3598bbb4d93ca666e2.mockapi.io/api/v1/users').then(res => {
            setUser(res.data)
            setMainUsers(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleDelete = async (itemId) => {
        if (await Confirm(`آیا از حذف  ${itemId} اطمینان دارید؟`)) {
            axios.delete(`https://6720dd3598bbb4d93ca666e2.mockapi.io/users/${itemId}`).then(res => {
                if (res.status === 200) {
                    let newUsers = user.filter(u => u.id !== itemId)
                    setUser(newUsers)
                    Alert("آیتم انتخابی شما با موفقیت حذف شد", "success")
                }
            }).catch(error => {
                console.error("خطا در حذف:", error);
                Alert("عملیات با خطا مواجه شد", "error")
            })
        }
    }
    const handleSearchName = (e) => {
        setUser(mainUsers.filter(u => u.name.includes(e.target.value)))
    }
    const handleSearchUserName = (e) => {
        setUser(mainUsers.filter(u => u.username.includes(e.target.value)))
    }
    return (
        <div className="mt-5 p-4 container-fluid">
            <h4 className="text-center fs-2 fw-bold">مدیریت کاربران</h4>
            <TextBg />
            <div className=' my-4 mx-0 d-flex container-fluid justify-content-between align-items-center'>
                <div className="form-group p-0 d-flex gap-3">
                    <input type="text" className="form-control shadow" placeholder="جستجو بر اساس نام" onChange={handleSearchName} />
                    <input type="text" className="form-control shadow" placeholder="جستجو بر اساس نام کاربری" onChange={handleSearchUserName} />
                </div>
                <div>
                    <div className="text-start px-0">
                        <Link to={'/addUser'} className="btn btn-success">
                            <span className="d-flex align-items-center gap-2">
                                <i className="btn_plus_icon fas fa-plus text-light"></i>
                                اضافه کردن کاربر جدید
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row container-fluid my-2 mb-4 justify-content-center w-100 mx-0">
                {user.length ? (
                    <table className="table table-striped bg-light shadow overflow-hidden rounded-3">
                        <thead>
                            <tr className="table-info">
                                <td>#</td>
                                <td>نام و نام خانوادگی</td>
                                <td>نام کاربری</td>
                                <td>ایمیل</td>
                                <td>عملیات</td>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {user.map(u => (

                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <FaEdit className="text-warning mx-2 pointer"
                                            onClick={() => navigate(`/addUser/edit/${u.id}`)}
                                        ></FaEdit>

                                        <IoTrashBin className="text-danger mx-2 pointer"
                                            onClick={() => handleDelete(u.name, u.id)}
                                        ></IoTrashBin>
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
        </div >
    )
}
export default Salert(Users)

