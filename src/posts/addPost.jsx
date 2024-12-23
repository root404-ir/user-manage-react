/** @jsxImportSource @emotion /react */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "@emotion/styled";
import soundFile from "../assets/sounds/new-notification-7-210334.mp3"
import { apAxios } from "../axios";
import { PostService, UpdatePostService } from "../services/postService";
import buttonLoadingGif from '../assets/rolling.gif'
import { useLoading } from "../contexts/loadingContext";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import { htmlToText } from "html-to-text";
const AddPost = () => {

    const Container = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        box-shadow:0 0 15px #000;
        border-radius:1rem;
    `
    const Wrapper = styled.div`
        background-color:#fff;
        padding:3rem;
        border-radius:1rem;
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
    const [postData, setPostData] = useState({
        title: '',
        text: '',
        category: 'react'
    })
    const handleAddPost = async (e) => {
        e.preventDefault()
        if (!postData.title.length) {
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
                await PostService(postData, setPostData)
                successSound()
                stopLoading()
            } else {
                await UpdatePostService(postData, postId)
                successSound()
                stopLoading()
            }
            navigate('/posts')
        } catch {

        }
    }
    useEffect(() => {
        if (postId) {
            const loadingTimer = setTimeout(() => setLoading(true), 500)
            apAxios.get(`/posts/${postId}`).then(res => {
                setPostData({
                    title: res.data.title,
                    text: res.data.text,
                    category: res.data.category
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
    }, [postData.title])
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }, [postData.text])
    const successSound = () => {
        audioRef.current.play()
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
                                <label>موضوع : </label>
                                <input type="text" ref={inputRef} value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                                <label>متن پست : </label>
                                <textarea value={postData.text} ref={textAreaRef} onChange={(e) => setPostData({ ...postData, text: e.target.value })}></textarea>
                                <label>دسته بندی</label>
                                <Select value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value })}>
                                    <option>react</option>
                                    <option>javascript</option>
                                    <option>css</option>
                                    <option>html</option>
                                    <option>bootstrap</option>
                                    <option>git</option>
                                    <option>tailwindcss</option>
                                </Select>
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

export default AddPost