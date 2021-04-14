import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import app from '../../../base'
import firebase from 'firebase/app'
import Loader from '../../../components/Loader/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import style from '../../../styles/create-post-page.module.scss'
import { Button } from '@material-ui/core';
import IRMEditor from '../../../components/IRMEditor';
import IRMAlert from '../../../components/IRMAlert';

const changePost = () => {
    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const firestore = app.firestore()
    const auth = firebase.auth()
    const [user] = useAuthState(auth)
    const [filePercent, setFilePercent] = useState(null);
    const [alertMessage, setAlert] = useState(<IRMAlert severity={'warning'} show={false}/>);

    const getPost = async (id) => {
        const firebasePost = firestore.collection('all-rubrics').doc(id)
        const doc = await firebasePost.get()
        setPost(doc.data())
        setLoading(false)
        return
    }

    useEffect(() => {
        if (user) {
            getPost(id)
        } else {
            return false // если пользователь не залогинился то у него будет бесконечная загрузка
        }
    }, [user]);

    const changeHandler = (event) => {
        // event.preventDefault()
        setPost({ ...post, [event.target.name]: event.target.value })
    }
    const handleEditorChange = (e) => {
        setPost({ ...post, text: e.target.getContent() })
    }

    const changePost = async (e) => {
        e.preventDefault()
        if (post.rubric !== 'Выберите рубрику' && post.rubric.trim() && post.description.trim() && post.title.trim() && post.text.trim()) {
            await firestore.collection('all-rubrics').doc(id).set(post);
            setAlert(<IRMAlert severity={'success'} text={"Запись успешно изменена"}/>)
        } else {
            setAlert(<IRMAlert severity={'warning'} text={"Заполнены не все поля. Поле с кратким описанием не должно содержать более 200 символов"}/>)
        }
    }

    if (!post || loading) {
        return <Loader />
    }

    return (
        <>
            <h1 className={style.pageTitle}>
                Изменить запись
            </h1>
            <form onSubmit={changePost}>
                <select className={style.rubric_select} value={post.rubric} name="rubric" onChange={changeHandler} required>
                    <option>Выберите рубрику</option>
                    <option>Россия</option>
                    <option>Мир</option>
                    <option>IT</option>
                </select>
                {alertMessage}
                <div className='container'>
                    <input type='text' className={style.title_input} value={post.title} name='title' onChange={changeHandler} placeholder='Введите заголовок поста' required />
                </div>
                <div className='container'>
                    <input type='text' className={style.title_input} value={post.description} name='description' onChange={changeHandler} placeholder='Введите краткое описание' required />
                </div>
                {/* {JSON.stringify(post)} */}
                <div className='container'>
                    <IRMEditor handleEditorChange={handleEditorChange} value={post.text}/>
                    <Button variant='contained' color='inherit' type='submit' className={style.create_post_btn}>Изменить</Button>
                </div>
            </form>

        </>
    );
}

export default changePost;
