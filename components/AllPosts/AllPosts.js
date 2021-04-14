import React, { Fragment, useEffect, useState } from 'react';
import Post from '../Post/Post';
import style from './style.module.scss'


const AllPosts = ({posts}) => {
    return (
        <div className={style.container}>
            {posts && posts.map((item,i)=>{
                return<Fragment key={`${item.id}_${i}`}>
                    <Post post={item} />
                </Fragment>
            })}
            
        </div>
    );
}

export default AllPosts;