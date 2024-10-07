import '../style.modules.css'
const Users = () => {
    return (
        <div className="mt-5 p-4 container-fluid">
            <h4 className="text-center">مدیریت کاربران</h4>
            <div className='row my-4 mx-0 flex justify-content-between align-items-center'>
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" className="form-control shadow" placeholder="جستجو" />
                </div>
                <div className="col-2 text-start px-0">
                    <button className="btn btn-success">
                        <i className="fas fa-plus text-light"></i>
                    </button>
                </div>
            </div>
            <div className="row my-2 mb-4 justify-content-center w-100 mx-0">
                <table className="table bg-light shadow">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>نام</td>
                            <td>نام کاربری</td>
                            <td>ایمیل</td>
                            <td>عملیات</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>علی</td>
                            <td>محمدی</td>
                            <td>mohammadrg360@gmail.com</td>
                            <td>
                                <i className="fas fa-edit text-warning mx-2 pointer"></i>
                                <i className="fas fa-trash text-danger mx-2 pointer"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Users