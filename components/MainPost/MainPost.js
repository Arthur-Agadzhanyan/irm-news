import React from 'react';
import style from './style.module.scss'

const MainPost = ({post}) => {
    return (
        <section className={style.wrapper} style={{background:`url(${post && post.img}) `}}>
            <div className={style.overlay}></div>
            <div className={style.container}>
                <div className={style.rubric}>{post && post.rubric}</div>
                <h1 className={style.title}>{post && post.title}</h1>
                <div className={style.description}>{post && post.description}</div>
            </div>
        </section>
    );
}

export default MainPost;
