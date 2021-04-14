import React from 'react';
import Link from 'next/link'
import style from './style.module.scss'

const Post = (props) => {
    const { img, id, title, rubric } = props.post
    return (
        <div className={style.post} style={{background:`url(${img})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}>
            <div className={style.overlay}></div>
            <div className={style.post__content}>
                <h5 className={style.content__rubric}>{rubric}</h5>
                <h3 className={style.content__title}>{title}</h3>
                <Link href={`/post/${id}`}><a className={style.content__link}>Читать далее</a></Link>
            </div>
        </div>
    );
}

export default Post;
