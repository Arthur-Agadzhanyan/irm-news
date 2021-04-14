import React from 'react';
import style from './style.module.scss'
import Link from 'next/link'
import firebase from "firebase/app"
import { Button } from '@material-ui/core';


const DashboardList = ({posts,deletePost}) => {

    return (
        <ul className={style.list}>
            {posts && posts.map((item,i)=>{
                return <li className={style.list__item} key={item.id}>
                    <div>
                        <span>{i+1}. </span>
                        <Link href={`/post/${item.id}`}><a>{item.title}</a></Link>
                    </div>
                    <div className={style.item__controls}>
                        <Link href={`/dashboard/changepost/${item.id}`}><a className={style.changeBtn}>Изменить</a></Link>
                        <Button className={style.deleteBtn} onClick={()=>deletePost(item.id,item.img)} color='secondary'>Удалить</Button>
                    </div>
                    

                </li>
            })}
        </ul>
    );
}

export default DashboardList;
