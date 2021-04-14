import React from 'react';
import style from './style.module.scss'

const Loader = () => {
    return (
        <div id={style.cube_loader}>
            <div className={style.caption}>
                <div className={style.cube_loader}>
                    <div className={`${style.cube} ${style.loader_1}`}>L</div>
                    <div className={`${style.cube} ${style.loader_2}`}>O</div>
                    <div className={`${style.cube} ${style.loader_4}`}>D</div>
                    <div className={`${style.cube} ${style.loader_3}`}>A</div>
                    
                </div>
            </div>
        </div>

    );
}

export default Loader;
