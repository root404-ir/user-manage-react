import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2"
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from "react"
import { GetIdTaskService, TaskService, UpdateTaskService } from "../services/todosService"
import { useLoading } from "../contexts/loadingContext"
const AddTodos = () => {
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
    const { taskId } = useParams()
    const navigate = useNavigate()
    const inputRef = useRef()
    const [loading, setLoading] = useState(true)
    const {buttonLoading, startLoading, stopLoading} = useLoading()
    const [taskData, setTaskData] = useState({
        title: ''
    })
    const handleAddTask = (e) => {
        e.preventDefault()
        if (!taskData.title.length) {
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
        if (!taskId) {
            TaskService(taskData, setTaskData)
        } else {
            UpdateTaskService(taskData, taskId)
        }

    }
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [taskData.title])
    useEffect(() => {
        if (taskId) {
            GetIdTaskService(taskId, setTaskData, setLoading)
        } else {
            setLoading(false)
        }
    }, [taskId])
    return (
        <div>
            <h4 className="text-center mt-5 fs-2 fw-bold">{taskId ? 'ویرایش کار' : 'افزودن کار'}</h4>
            <Container>
                {loading ? (
                    <img src="/assets/gif/Dual Ring@1x-1.0s-200px-200px (1).gif" alt="" className="preloader" />
                ) : (
                    <form onSubmit={handleAddTask}>
                        <Wrapper>
                            <div className="d-flex flex-column gap-2">
                                <label>موضوع کار</label>
                                <input type="text" ref={inputRef} value={taskData.title} placeholder="موضوع کار خود را وارد کنید" onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
                            </div>
                            <div className="d-flex justify-content-end mt-4 gap-3">
                                <button className="btn btn-danger" onClick={() => navigate('/todos')}>بازگشت</button>
                                <button className="btn btn-warning">{taskId ? 'ویرایش' : 'ذخیره'}</button>
                            </div>
                        </Wrapper>
                    </form>
                )}
            </Container>
        </div>
    )
}
export default AddTodos