import React, { useState, useEffect } from 'react';
import firebase from "firebase/app"
import app from '../../base'
import Loader from '../../components/Loader/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '@material-ui/core/Button';
import style from '../../styles/create-post-page.module.scss'
import IRMEditor from '../../components/IRMEditor';
import IRMAlert from '../../components/IRMAlert';

const createPostPage = () => {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: '', rubric: '', description: '', img: '', text: ''
    });
    const [file, setFile] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const firestore = firebase.firestore()
    const postsRef = firestore.collection('all-rubrics')
    const auth = firebase.auth()
    const [user] = useAuthState(auth)
    const [filePercent, setFilePercent] = useState(null);
    const [alertMessage, setAlert] = useState(<IRMAlert severity={'success'} text={"Пост успешно создан"} show={false}/>);

    const fileInput = React.createRef();
    const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)); // генерируем 
    // Общее количество уникальных ключей UUID составляет 2128 = 25616 или около 3,4 × 1038. Это означает, что генерируя 1 триллион ключей каждую наносекунду, перебрать все возможные значения удастся лишь за 10 миллиардов лет.

    useEffect(() => {
        if (user) {
            setLoading(false)
        } else {
            return false // если пользователь не залогинился то у него будет бесконечная загрузка
        }
    });

    const changeHandler = (event) => {
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const onFileChange = (event) => {
        const fileSrc = event.target.files[0]
        if (fileSrc) {
            const reader = new FileReader()
            reader.onload = ev => {
                const src = ev.target.result
                setFileUrl(src)
            }
            setFile(fileSrc)
            setForm({ ...form, img: `gs://newsdb-a.appspot.com/images/${uuid()}` })

            reader.readAsDataURL(fileSrc)
        }

    }


    const createPost = async (e) => {
        e.preventDefault()
        if (form.rubric !== 'Выберите рубрику' && form.rubric.trim() && form.description.trim() && form.title.trim() && form.description.trim().length <= 200) {
            const storageRef = app.storage().ref(`images/`)
            const fileRef = storageRef.child(uuid())

            const task = fileRef.put(file)

            task.on('state_changed',
                snapshot => { 
                    setLoading(true)
                    setFilePercent(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)+'%')
                },
                error => { 
                    return setAlert(<IRMAlert severity={'error'} text={'Что-то пошло не так, повторите попытку позже'}/>)
                },
                () => {
                    task.snapshot.ref.getDownloadURL().then(url => {     
                        postsRef.add({
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            title: form.title,
                            rubric: form.rubric,
                            description: form.description,
                            text: form.text,
                            img: url
                        }).then((data)=>{
                            setFilePercent(null)
                            setLoading(false)
                        }).catch(e=>setAlert(<IRMAlert severity={'success'} text={"Что-то пошло не так, повторите попытку позже"}/>))
                        .then(setAlert(<IRMAlert severity={'success'} text={"Пост успешно создан"}/>))
                        
                    })
                })
        }
        else {
            setAlert(<IRMAlert severity={'warning'} text={'Заполнены не все поля.\n Поле с кратким описанием не должно содержать более 200 символов'}/>) 
        }
    }

    const handleEditorChange = (e) => {
        setForm({ ...form, text: e.target.getContent() })
    }

    if (loading) {
        return <Loader />
    }

    if(filePercent){
        return <h1 style={{textAlign: 'center',marginTop:'10%'}}>{filePercent}</h1>
    }

    return (
        <>
            <div>
                <h1 className={style.pageTitle}>
                    Написать новость
                </h1>
                
                <form onSubmit={createPost}>

                    {fileUrl ? <img className={style.file_image} src={fileUrl} /> : ''}
                    <input type='file' accept='.png, .jpg, .jpeg, .gif' name='img' ref={fileInput} onChange={onFileChange} className={style.fileInput} />

                    {fileUrl
                        ? <Button className={style.change_file_btn} variant='contained' color='secondary' onClick={() => fileInput.current.click()}>Выбрать другое изображение</Button>
                        : <button className={style.fileBtn} onClick={() => fileInput.current.click()} type='button'>Щелкните значок «+» чтобы загрузить свои собственные изображения.</button>}

                    <select className={style.rubric_select} value={form.rubric} name="rubric" onChange={changeHandler} required>
                        <option>Выберите рубрику</option>
                        <option>Россия</option>
                        <option>Мир</option>
                        <option>IT</option>
                    </select>
                    {alertMessage}
                    <div className='container'>
                        <input type='text' className={style.title_input} value={form.title} name='title' onChange={changeHandler} placeholder='Введите заголовок поста'/>
                    </div>
                    <div className='container'>
                        <input type='text' className={style.title_input} value={form.description} name='description' onChange={changeHandler} placeholder='Введите краткое описание'/>
                    </div>
                    <div className='container'>
                        <IRMEditor handleEditorChange={handleEditorChange} />
                        <Button variant='contained' color='inherit' type='submit' className={style.create_post_btn}>Создать</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default createPostPage;
