/** @jsxImportSource @emotion /react */
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "@emotion/styled";
import soundFile from "../assets/sounds/new-notification-7-210334.mp3"
import { apAxios } from "../axios";
import { PostService, UpdatePostService } from "../services/postService";
import buttonLoadingGif from '../assets/rolling.gif'
import { useLoading } from "../contexts/loadingContext";
import Swal from "sweetalert2";
import axios from "axios";

const init = {
    postData: {
        userId: '',
        title: '',
        text: '',
        category: 'react'
    },
    users: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeUser':
            return { ...state, users: action.payload }
        case 'isUpdate':
            return { ...state, postData: action.payload }
        case 'setInputValue':
            return {
                ...state, postData: {
                    ...state.postData,
                    [action.propName]: action.propValue
                }
            }
        default:
            return state
    }
}

const AddPost2 = () => {

    const [data, dispatch] = useReducer(reducer, init)

    const Container = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width:800px;
        box-shadow:0 0 15px #000;
        border-radius:1rem;
    `
    const Wrapper = styled.div`
        background-color:#fff;
        padding:2rem;
        border-radius:1rem;
        width:800px;
    `
    const Inputs = styled.div`
        display:flex;
        flex-direction:column;
        gap:0.3rem;
    `
    const Select = styled.select`
        border-radius:0.3rem;
        outline:none;
        border:2px solid #dc3545;
    `

    const navigate = useNavigate()
    const { postId } = useParams()
    const inputRef = useRef()
    const textAreaRef = useRef()
    const audioRef = useRef(new Audio(soundFile))
    const [loading, setLoading] = useState(true)
    const { buttonLoading, startLoading, stopLoading } = useLoading()
    const handleAddPost = async (e) => {
        e.preventDefault()
        if (!data.postData.title.length) {
            Swal.fire({
                title: "خطا!",
                text: "عنوان نباید خالی باشد!",
                icon: "error",
                backdrop: `
                #d67772
                left top
                no-repeat
                `
            });
            return
        }
        startLoading()
        try {
            if (!postId) {
                await PostService(data.postData)
                successSound()
                stopLoading()
            } else {
                await UpdatePostService(data.postData, postId)
                successSound()
                stopLoading()
            }
            navigate('/posts')
        } catch {

        }
    }
    useEffect(() => {
        axios.get('https://6720dd3598bbb4d93ca666e2.mockapi.io/users').then(res => {
            dispatch({
                type: 'changeUser',
                payload: res.data
            })
        })
        if (postId) {
            const loadingTimer = setTimeout(() => setLoading(true), 500)
            apAxios.get(`/posts/${postId}`).then(res => {
                dispatch({
                    type: 'isUpdate',
                    payload: res.data
                })
                setLoading(false)
            }).finally(() => {
                clearTimeout(loadingTimer)
            })
        } else {
            setLoading(false)
        }
    }, [postId])
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [data.postData.title])
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }, [data.postData.text])
    const successSound = () => {
        audioRef.current.play()
    }
    const setInputValue = (e, propName) => {
        dispatch({
            type: 'setInputValue',
            propName: propName,
            propValue: e.target.value
        })
    }
    return (
        <div>
            <h4 className="text-center mt-5 fs-2 fw-bold">
                {postId ? 'ویرایش پست' : 'اضافه کردن پست جدید'}
            </h4>
            <Container>
                {loading ? (
                    <img src="/assets/gif/Dual Ring@1x-1.0s-200px-200px (1).gif" alt="" className="preloader" />
                ) : (
                    <form onSubmit={handleAddPost}>
                        <Wrapper>
                            <Inputs>
                                <div className="d-flex gap-5">
                                    <div className="d-flex flex-column w-50">
                                        <label>کاربر : </label>
                                        <select className="form-select" value={data.postData.userId} onChange={(e) => setInputValue(e, 'userId')}>
                                            <option value="">کاربر مورد نظر را وارد کنید</option>
                                            {data.users.map(user => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <label>شناسه کاربر</label>
                                        <input type="text" disabled className="form-control" value={data.postData.userId} onChange={(e) => setInputValue(e, 'userId')} />
                                    </div>
                                </div>
                                <div className="d-flex gap-5">
                                    <div className="d-flex flex-column w-50">
                                        <label>موضوع : </label>
                                        <input type="text" className="form-control" ref={inputRef} value={data.postData.title} onChange={(e) => setInputValue(e, 'title')} />
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <label>دسته بندی</label>
                                        <Select value={data.postData.category} onChange={(e) => setInputValue(e, 'category')}>
                                            <option>react</option>
                                            <option>javascript</option>
                                            <option>css</option>
                                            <option>html</option>
                                            <option>bootstrap</option>
                                            <option>git</option>
                                            <option>tailwindcss</option>
                                        </Select>
                                    </div>
                                </div>
                                <label>متن پست : </label>
                                <textarea rows={5} className="form-control" value={data.postData.text} ref={textAreaRef} onChange={(e) => setInputValue(e, 'text')}></textarea>
                            </Inputs>
                            <div className="d-flex justify-content-end mt-4 gap-3">
                                <button className="btn btn-danger" onClick={() => navigate('/posts')}>بازگشت</button>
                                <button type="submit" className="btn btn-warning d-flex align-items-center gap-2" disabled={buttonLoading}>
                                    {postId ? 'ویرایش' : 'ذخیره'}
                                    {buttonLoading && <img src={buttonLoadingGif} alt="" width={20} />}
                                </button>
                            </div>
                        </Wrapper>
                    </form>
                )}
            </Container>
        </div>
    )
}

export default AddPost2