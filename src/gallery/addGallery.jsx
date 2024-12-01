// import React, { useEffect, useRef, useState } from "react"
// import styled from "@emotion/styled";
// import { useNavigate, useParams } from "react-router";
// import axios from "axios";
// import Swal from "sweetalert2";
// const AddGallery = ({ addPhoto }) => {
//     const Label = styled.label`
//         display:inline-block;
//         padding:10px;
//         color:#fff;
//         background-color:#4CAF50;
//         border-radius:5px;
//         cursor:pointer;
//         font-size:16px;
//         transition:background-color 0.3s;
//         &:hover{
//             background-color:#45a049;
//         }
//     `
//     const Button = styled.button`
//         margin-top:10px;
//         padding:10px 20px;
//         font-size:16px;
//         background-color:#4CAF50;
//         color:#fff;
//         border:none;
//         border-radius:5px;
//         cursor:pointer;
//         transition: background-color 0.3s;
//         &:hover{
//             background-color: #45a049;
//         }
//     `
//     const Container = styled.div`
//         position:absolute;
//         transform: translate(-50%, -50%);
//         top: 50%;
//         left: 50%;
//         background-color:#464646;
//         width:500px;
//         padding:2rem;
//         border-radius:1rem;
//         overflow:hidden;
//         box-shadow:0 0 20px #000;
//         `
//     const Form = styled.form`
//         display:flex;
//         flex-direction:column;
//         `
//     const InputText = styled.input`
//         padding:10px;
//     `
//     const LabelSelect = styled.div`
//         border:2px dashed #ccc;
//         padding:20px;
//         border-radius:5px;
//         text-align:center;
//     `
//     const FileName = styled.p`
//         position:absolute;
//         transform: translate(-50%, -50%);
//         bottom:1rem;
//         left: 50%;
//         background-color:darkorange;
//         padding:0.4rem;
//         border-radius:5px;
//         font-weight:bold;
//     `
//     const navigate = useNavigate()
//     const { galleryId } = useParams()
//     const inputRef = useRef()
//     const [fileName, setFileName] = useState('')
//     const [loading, setLoading] = useState(true)
//     const [image, setImage] = useState(null)
//     const [galleryData, setGalleryData] = useState({
//         title: '',
//         url: ''
//     })
//     const handleFileChange = (e) => {
//         setImage(e.target.files[0])
//         // const file = e.target.files[0]
//         // if (file) {
//         //     setFileName(file.name)
//         // }
//     }
//     const handleImageUpload = async () => {
//         const formData = new FormData()
//         formData.append('image', image)

//         try {
//             const response = await axios.post(`https://api.imgbb.com/1/upload?key=505151d73d3684aac43616c27c638869`, formData)
//             const uploadImageUrl = response.data.data.url
//             addPhoto(uploadImageUrl)
//         } catch (error) {
//             console.error('Error uploading the image', error)
//         }
//     }
//     const handleAddGallery = (e) => {
//         e.preventDefault()
//         if (!galleryId) {
//             if (galleryData.title.length) {
//                 axios.post('https://672fbdd966e42ceaf15e955b.mockapi.io/api/v1/gallery', galleryData).then(res => {
//                     Swal.fire({
//                         title: "اضافه شد!",
//                         text: `عکس با موضوع ${res.data.title} با موفقیت اضافه شد!`,
//                         icon: "success"
//                     });
//                     setGalleryData({
//                         title: '',
//                         url: ''
//                     })
//                 })
//             } else {
//                 Swal.fire({
//                     title: "عنوان نباید خالی باشد!",
//                     icon: "warning"
//                 });
//             }
//         } else {
//             axios.put(`https://672fbdd966e42ceaf15e955b.mockapi.io/api/v1/gallery/${galleryId}`, galleryData).then(res => {
//                 Swal.fire({
//                     title: "ویرایش شد!",
//                     text: `پست با موضوع ${res.data.title} با موفقیت ویرایش شد!`,
//                     icon: "success"
//                 });
//             }).catch(err => {
//                 console.error(err)
//                 Swal.fire({
//                     title: "خطا!",
//                     text: "مشکلی در ویرایش کاربر پیش آمد. لطفاً دوباره تلاش کنید.",
//                     icon: "error"
//                 });
//             })
//         }
//     }
//     useEffect(() => {
//         if (galleryId) {
//             const loadingTimer = setTimeout(() => setLoading(true), 500)
//             axios.get(`https://672fbdd966e42ceaf15e955b.mockapi.io/api/v1/gallery/${galleryId}`).then(res => {
//                 setGalleryData({
//                     title: res.data.title,
//                     url: res.data.url
//                 })
//                 setLoading(false)
//             }).finally(() => {
//                 clearInterval(loadingTimer)
//             })
//         } else {
//             setLoading(false)
//         }
//     }, [galleryId])
//     useEffect(() => {
//         if (inputRef.current) {
//             inputRef.current.focus()
//         }
//     }, [galleryData.title])
//     return (
//         <div>
//             <h4 className="text-center fs-2 fw-bold mt-5">
//                 {galleryId ? "ویرایش گالری" : "افزودن گالری"}
//             </h4>
//             <Container>
//                 <Form onSubmit={handleAddGallery}>
//                     <InputText type="text" ref={inputRef} value={galleryData.title} onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })} placeholder="عنوان عکس" className="mb-4" />
//                     <LabelSelect>
//                         <p className="text-white">لطفا عکس مورد نظر خودرا بارگزاری کنید</p>
//                         <Label for="imageUpload" class="custom-file-upload" className="text-center" >
//                             انتخاب تصویر
//                         </Label>
//                     </LabelSelect>
//                     <input type="file" id="imageUpload" name="image" accept="image/*" className="d-none" onChange={handleFileChange} />
//                     <Button className="text-center mt-4" onClick={handleImageUpload}>آپلود</Button>
//                     <div className="d-flex gap-3 justify-content-end">
//                         <button className="btn btn-danger mt-5" onClick={() => navigate('/gallery')}>بازگشت</button>
//                         <button type="submit" className="btn btn-warning mt-5">
//                             {galleryId ? "ویرایش" : "ذخیره"}
//                         </button>
//                     </div>
//                 </Form>
//             </Container>
//             {fileName && <FileName>نام فایل انتخاب شده: {fileName}</FileName>}
//         </div>
//     )
// }
// export default AddGallery












import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const AddGallery = ({ addPhoto }) => {
    const Label = styled.label`
        display:inline-block;
        padding:10px;
        color:#fff;
        background-color:#4CAF50;
        border-radius:5px;
        cursor:pointer;
        font-size:16px;
        transition:background-color 0.3s;
        &:hover{
            background-color:#45a049;
        }
    `;
    const Button = styled.button`
        margin-top:10px;
        padding:10px 20px;
        font-size:16px;
        background-color:#4CAF50;
        color:#fff;
        border:none;
        border-radius:5px;
        cursor:pointer;
        transition: background-color 0.3s;
        &:hover{
            background-color: #45a049;
        }
    `;
    const Container = styled.div`
        position:absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        background-color:#464646;
        width:500px;
        padding:2rem;
        border-radius:1rem;
        overflow:hidden;
        box-shadow:0 0 20px #000;
    `;
    const Form = styled.form`
        display:flex;
        flex-direction:column;
    `;
    const InputText = styled.input`
        padding:10px;
    `;
    const LabelSelect = styled.div`
        border:2px dashed #ccc;
        padding:20px;
        border-radius:5px;
        text-align:center;
    `;
    const FileName = styled.p`
        position:absolute;
        transform: translate(-50%, -50%);
        bottom:1rem;
        left: 50%;
        background-color:darkorange;
        padding:0.4rem;
        border-radius:5px;
        font-weight:bold;
    `;

    const navigate = useNavigate();
    const { galleryId } = useParams();
    const inputRef = useRef();
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [galleryData, setGalleryData] = useState({
        title: '',
        url: ''
    });
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setIsImageUploaded(false); // Reset upload status
    };

    const handleImageUpload = async () => {

        if (!image) {
            Swal.fire({
                title: "خطا!",
                text: "لطفا یک تصویر انتخاب کنید",
                icon: "warning"
            });
            return;
        }

        const formData = new FormData();
        formData.append('image', image);  // فایل تصویر باید به این شیوه اضافه شود

        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=9f7d57e2938464ad4b140fa1f40b7ec1`, // کلید API خود را وارد کنید
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data' // مطمئن شوید که هدر درست ارسال می‌شود
                    }
                }
            );

            const uploadedImageUrl = response.data.data.url;
            setGalleryData(prevData => ({ ...prevData, url: uploadedImageUrl }));
            addPhoto(uploadedImageUrl);
            setIsImageUploaded(true); // تغییر وضعیت آپلود تصویر به true
            Swal.fire({
                title: "موفقیت آمیز!",
                text: "تصویر با موفقیت بارگذاری شد",
                icon: "success"
            });
        } catch (error) {
            console.error('Error uploading the image', error);
            Swal.fire({
                title: "خطا!",
                text: "مشکلی در بارگذاری تصویر پیش آمد. لطفاً دوباره تلاش کنید.",
                icon: "error"
            });
        }
    };



    const handleAddGallery = (e) => {
        e.preventDefault();
        if (!galleryData.title.length) {
            Swal.fire({
                title: "خطا!",
                text: "عنوان نباید خالی باشد!",
                icon: "warning"
            });
            return;
        }

        if (!isImageUploaded) {
            Swal.fire({
                title: "خطا!",
                text: "لطفا ابتدا تصویر را بارگذاری کنید",
                icon: "warning"
            });
            return;
        }
        if (!galleryId) {
            axios.post('https://672fbdd966e42ceaf15e955b.mockapi.io/api/v1/gallery', galleryData).then(res => {
                Swal.fire({
                    title: "اضافه شد!",
                    text: `عکس با موضوع ${res.data.title} با موفقیت اضافه شد!`,
                    icon: "success"
                });
                setGalleryData({ title: '', url: '' });
                setFileName('');
                setIsImageUploaded(false);
            });
        } else {
            axios.put(`https://672fbdd966e42ceaf15e955b.mockapi.io/api/v1/gallery/${galleryId}`, galleryData).then(res => {
                Swal.fire({
                    title: "ویرایش شد!",
                    text: `پست با موضوع ${res.data.title} با موفقیت ویرایش شد!`,
                    icon: "success"
                });
            }).catch(err => {
                console.error(err);
                Swal.fire({
                    title: "خطا!",
                    text: "مشکلی در ویرایش کاربر پیش آمد. لطفاً دوباره تلاش کنید.",
                    icon: "error"
                });
            });
        }
    };

    useEffect(() => {
        if (galleryId) {
            const loadingTimer = setTimeout(() => setLoading(true), 500);
            axios.get(`https://672fbdd966e42ceaf15e955b.mockapi.io/api/v1/gallery/${galleryId}`).then(res => {
                setGalleryData({
                    title: res.data.title,
                    url: res.data.url
                });
                setLoading(false);
            }).finally(() => {
                clearInterval(loadingTimer);
            });
        } else {
            setLoading(false);
        }
    }, [galleryId]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [galleryData.title]);

    const tts = async (e) => {
        e.preventDefault()
        const { value: file } = await Swal.fire({
            title: "عکس خودرا انتخاب کنید",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "aria-label": "Upload your profile picture"
            }
        });
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    title: "عکس مورد نظر آپلود شد",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture"
                });
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <div>
            <h4 className="text-center fs-2 fw-bold mt-5">
                {galleryId ? "ویرایش گالری" : "افزودن گالری"}
            </h4>
            <Container>
                <Form onSubmit={handleAddGallery}>
                    <InputText
                        type="text"
                        ref={inputRef}
                        value={galleryData.title}
                        onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                        placeholder="عنوان عکس"
                        className="mb-4"
                    />
                    <LabelSelect>
                        <p className="text-white">لطفا عکس مورد نظر خودرا بارگزاری کنید</p>
                        <Label htmlFor="imageUpload" onClick={tts} className="text-center">
                            انتخاب تصویر
                        </Label>
                    </LabelSelect>
                    <input type="file" id="imageUpload" name="image" accept="image/*" className="d-none" onChange={handleFileChange} />
                    <Button type="button" className="text-center mt-4" onClick={handleImageUpload}>آپلود</Button>
                    <div className="d-flex gap-3 justify-content-end">
                        <button type="button" className="btn btn-danger mt-5" onClick={() => navigate('/gallery')}>بازگشت</button>
                        <button type="submit" className="btn btn-warning mt-5">
                            {galleryId ? "ویرایش" : "ذخیره"}
                        </button>
                    </div>
                </Form>
            </Container>
            {fileName && <FileName>نام فایل انتخاب شده: {fileName}</FileName>}
        </div>
    );
}

export default AddGallery;
