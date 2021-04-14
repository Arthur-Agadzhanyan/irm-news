import React, { useEffect, useState } from 'react';
import Loader from './Loader/Loader';
import firebase from "firebase/app"
import { useAuthState } from 'react-firebase-hooks/auth'
import style from '../styles/dashboard.module.scss'
import DashboardList from './DashboardList/DashboardList';
import { Button } from '@material-ui/core';
import app from '../base'

const DashboardPage = ({pageTitle,rubric}) => {
    const [listOfNews, setListOfNews] = useState([]);
    const [lastDoc, setLastDoc] = useState({});
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const auth = firebase.auth()
    const [user] = useAuthState(auth)
    const firestore = firebase.firestore()
    const postsRef = rubric ? firestore.collection('all-rubrics').where('rubric', '==', rubric) : firestore.collection('all-rubrics')
    // const [posts] = useCollectionData(query,{idField:'id'})

    useEffect(() => {
        postsRef
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get({ idField: 'id' })
            .then(collections => {
                updateState(collections)
            })
    }, [])

    const updateState = (collections) => {
        const isCollectionEmpty = collections.size === 0
        if (!isCollectionEmpty) {
            const news = collections.docs.map(news => {
                return { ...news.data(), id: news.id }
            })
            const lastDoc = collections.docs[collections.docs.length - 1]
            setListOfNews([...listOfNews, ...news])
            setLastDoc(lastDoc)
        } else {
            setIsEmpty(true)
        }
        setLoading(false)
    }

    const fetchMore = () => {
        setLoading(true)
        postsRef
            .orderBy('createdAt', 'desc')
            .startAfter(lastDoc)
            .limit(10)
            .get()
            .then(collections => {
                updateState(collections)
            })
    }

    if (!listOfNews.length) {
        return <Loader />
    }

    const deletePost = async (id,img)=>{
        const firestore = firebase.firestore()
        const storageRef = app.storage().ref(`images/`)
        const delToken = img.split('?')
        const imgFileName = delToken[0].split('%2F')[1]
        await storageRef.child(imgFileName).delete(); // при удалении поста мы удаляем и его основную картинку из Firebase Storage
        await firestore.collection('all-rubrics').doc(id).delete(); // удаляем запись из Cloud Firestore
        setListOfNews(listOfNews.filter(news=> news.id !== id))
    }

    return user && <div className='pb-50'>

        <h1 className={style.title}>{pageTitle}</h1>
        {listOfNews && listOfNews.length ? <DashboardList posts={listOfNews} deletePost={deletePost}/> : <div className={style.no_posts}>Новостей нет</div>}
        {loading && <h2 className='loading'>Загрузка</h2>}
        {!loading && !isEmpty && <Button variant='contained' color='inherit' className='lazy-load_btn light_btn' onClick={fetchMore}>Показать ещё...</Button>}
    </div>
}

export default DashboardPage
