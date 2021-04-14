import MainPost from './/MainPost/MainPost'
import AllPosts from './AllPosts/AllPosts'
import firebase from "firebase/app"
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import Loader from './/Loader/Loader'
import { useRouter } from 'next/router';

export function RubricPage({rubricName}) {
  const [listOfNews, setListOfNews] = useState([]);
  const [lastDoc, setLastDoc] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const firestore = firebase.firestore()

  const postsRef = rubricName ? firestore.collection('all-rubrics').where('rubric', '==', rubricName) : firestore.collection('all-rubrics')

  useEffect(() => {
    postsRef
      .orderBy('createdAt','desc')
      .limit(3)
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
      .orderBy('createdAt','desc')
      .startAfter(lastDoc)
      .limit(3)
      .get()
      .then(collections => {
        updateState(collections)
      })
  }

  if (!listOfNews.length) {
    return <Loader />
  }

  return (
    <div className='bg-black pb-100'>
      <MainPost post={listOfNews && listOfNews[0]} />
      <AllPosts posts={listOfNews} />
      {loading && <h2 className='loading'>Загрузка</h2>}
      {!loading && !isEmpty && <Button variant='contained' color='inherit' className='lazy-load_btn dark_btn' onClick={fetchMore}>Показать ещё...</Button>}
    </div>
  )
}
