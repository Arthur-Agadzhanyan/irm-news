import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import app from '../../base'
import Loader from '../../components/Loader/Loader';
import style from '../../styles/post.module.scss'
import ReactHtmlParser from 'react-html-parser'

const changePost = () => {
    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const firestore = app.firestore()

    const getPost = async (id) => {
        const firebasePost = firestore.collection('all-rubrics').doc(id)
        const doc = await firebasePost.get()
        setPost(doc.data())
        setLoading(false)
        return
    }

    useEffect(() => {
        getPost(id)
    }, [id]);


    if (!post || loading) {
        return <Loader />
    }

    return (
        <div className={`${style.post}`}>
            <img className={style.post__image} src={post.img} />
            <div className={`${style.post__title_block} container`}>
                <h4 className={style.post__rubric}>{post.rubric}</h4>
                <h1 className={style.post__title}>{post.title}</h1>
            </div>
            <div className='container'>
            <div className={style.post__description}>
                {post.description}
            </div>
                <div className={style.post__text}>
                    {ReactHtmlParser(post.text)}
                </div>
            </div>
        </div>
    );
}

export default changePost;