import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const AddComment = () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [commentData, setCommentData] = useState({
        comment: ''
    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...commentData,
            postId,
        };

        axios.post(`https://676b005fbc36a202bb83dff7.mockapi.io/comments`, dataToSubmit)
            .then((res) => {
                Swal.fire({
                    title: 'موفقیت آمیز',
                    text: 'کامنت شما با موفقیت اضافه شد',
                    icon: 'success',
                });
                navigate('/posts')
                setCommentData({ comment: '' });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'خطا',
                    text: 'ارسال کامنت با خطا مواجه شد!',
                    icon: 'error',
                });
                console.error(err);
            });
    };

    return (
        <div className="mt-5 p-4 container-fluid">
            <h4 className="text-center fs-2 fw-bold">اضافه کردن کامنت</h4>
            <form onSubmit={handleCommentSubmit}>
                <div className="bg-white rounded-2 p-4">
                    <textarea
                        value={commentData.comment}
                        onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                        style={{
                            height: '200px',
                            width:'100%',
                            padding:'1rem'
                        }}
                    />
                    <div className="d-flex gap-3 justify-content-end mt-5">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => navigate('/posts')}
                        >
                            بازگشت
                        </button>
                        <button className="btn btn-warning" type="submit">
                            ارسال کامنت
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddComment;
