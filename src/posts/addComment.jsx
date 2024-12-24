import React from "react";
import ReactQuill from "react-quill";
const AddComment = () => {
    const handleCommentSubmit = (e)=>{
        e.preventDefault()
    }
    return (
        <div className="mt-5 p-4 container-fluid">
            <h4 className="text-center fs-2 fw-bold">اضافه کردن کامنت</h4>
            <form onSubmit={handleCommentSubmit}>
                <div className="bg-white rounded-2 p-4">
                    <ReactQuill style={{
                        height: '200px',
                    }} />
                    <div className="d-flex gap-3 justify-content-end mt-5">
                        <button className="btn btn-danger">بازگشت</button>
                        <button className="btn btn-warning" type="submit">ارسال کامنت</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddComment