/** @jsxImportSource @emotion /react */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "@emotion/styled";
import soundFile from "../assets/sounds/new-notification-7-210334.mp3"
import { apAxios } from "../axios";
import { PostService, UpdatePostService } from "../services/postService";
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
    const audioRef = useRef(new Audio(soundFile))
    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState({
        title: '',
        category: ''
    })
    const handleAddPost = (e) => {
        e.preventDefault()
        if (!postId) {
            PostService(postData, setPostData)
            successSound()
        } else {
            successSound()
            UpdatePostService(postData, postId)
        }
    }
    useEffect(() => {
        if (postId) {
            const loadingTimer = setTimeout(() => setLoading(true), 500)
            apAxios.get(`/posts/${postId}`).then(res => {
                setPostData({
                    title: res.data.title,
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
                                <button className="btn btn-danger" onClick={() => navigate('/post')}>بازگشت</button>
                                <button type="submit" className="btn btn-warning">
                                    {postId ? 'ویرایش' : 'ذخیره'}
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