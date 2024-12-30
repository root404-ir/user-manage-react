import { useNavigate, useParams } from 'react-router'
import './addUser.css'
import React, { useEffect, useState } from 'react'
import { apAxios } from '../axios'
import { userService, updateUserService } from '../services/userService'
import buttonLoadingGif from '../assets/rolling.gif'
import { useLoading } from '../contexts/loadingContext'
import NavigateComponent from './navigate'
const Adduser = (props) => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
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

    const [emailError, setEmailError] = useState('')
    const { buttonLoading, startLoading, stopLoading } = useLoading()
    const [emailValid, setEmailValid] = useState('')
    const handleAddUser = async (e) => {
        e.preventDefault()
        startLoading()
        try {
            if (!userId) {
                await userService(data, setData)
                stopLoading()
            } else {
                await updateUserService(data, userId)
                stopLoading()
            }
            navigate('/')
        } catch {
            stopLoading()
        }

    }
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }
    const handleEmailChange = (e) => {
        const email = e.target.value
        setData({ ...data, email })
        if (validateEmail(email)) {
            setEmailValid('ایمیل معتبر است')
            setEmailError('')
        } else {
            setEmailError('ایمیل نامعتبر')
            setEmailValid('')
        }
    }
    useEffect(() => {
        if (userId) {
            const loadingTimer = setTimeout(() => setLoading(true), 500)
            apAxios.get(`/users/${userId}`).then(res => {
                setData({
                    name: res.data.name,
                    username: res.data.username,
                    email: res.data.email,
                    address: {
                        street: res.data.address.street,
                        city: res.data.address.city,
                        suite: res.data.address.suite,
                        zipcode: res.data.address.zipcode
                    }
                })
                setLoading(false)
            }).finally(() => {
                clearTimeout(loadingTimer)
            })
        } else {
            setLoading(false)
        }
    }, [userId]);

    return (
        <div className='wrapper'>
            {loading ? (
                <img src="/assets/gif/Dual Ring@1x-1.0s-200px-200px (1).gif" alt="" className="preloader" />
            ) : (
                <div>
                    <h5>
                        {userId ? "ویرایش کاربر" : "افزودن کاربر"}
                    </h5>
                    <form action="" onSubmit={handleAddUser}>
                        <div className="addUser_container">
                            <div className='inputs'>
                                <label>نام و نام خانوادگی</label>
                                <input type={"text"} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                                <label>نام کاربری</label>
                                <input type={"text"} value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                                <label>ایمیل</label>
                                <input type={"email"} value={data.email} onChange={handleEmailChange} />
                                {emailError ? <p className='text-danger'>{emailError}</p> : emailValid ? <p className='text-success'>{emailValid}</p> : null}

                                <div className='address-inputs'>
                                    <label>آدرس</label>
                                    <div className='address-inputs-a'>
                                        <input type={"text"} placeholder='شهر' value={data.address.city} onChange={(e) => setData({ ...data, address: { ...data.address, city: e.target.value } })} />
                                        <input type={"text"} placeholder='خیابان' value={data.address.street} onChange={(e) => setData({ ...data, address: { ...data.address, street: e.target.value } })} />
                                    </div>
                                    <div className='address-inputs-b'>
                                        <input type={"text"} placeholder='ادامه آدرس' value={data.address.suite} onChange={(e) => setData({ ...data, address: { ...data.address, suite: e.target.value } })} />
                                        <input type={"text"} placeholder='کد پستی' value={data.address.zipcode} onChange={(e) => setData({ ...data, address: { ...data.address, zipcode: e.target.value } })} />
                                    </div>
                                </div>
                                <div className='buttons'>
                                    <button onClick={() => navigate('/')} className='bg-danger text-white pointer'>بازگشت</button>
                                    <button type={'submit'} className='bg-warning pointer d-flex align-items-center-center gap-2' disabled={buttonLoading}>
                                        {userId ? "ویرایش" : "ذخیره"}
                                        {buttonLoading && <img src={buttonLoadingGif} alt="" width={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            )}
        </div >
    )
}
export default NavigateComponent(Adduser)
