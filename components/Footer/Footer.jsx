import React from 'react';
import style from './footer.module.scss'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import Link from 'next/link'

const Footer = () => {
    return (
        <>
            <div className={`${style.footer}`}>
                <div className='container'>
                    <div className={style.social}>
                    <a href='https://www.facebook.com/' target='_blank'><FacebookIcon className={style.social__icon} /></a>
                    <a href='https://twitter.com/' target='_blank'><TwitterIcon className={style.social__icon} /></a>
                    <a href='https://www.pinterest.com/' target='_blank'><PinterestIcon className={style.social__icon} /></a>
                    <a href='https://www.instagram.com/' target='_blank'><InstagramIcon className={style.social__icon} /></a>
                    </div>
                    
                    <h2 className={style.footer__brand}>IRM News</h2>
                    <div className={style.about_links}>
                        <Link href='/sales'><a className={style.links__item}>Реклама</a></Link>
                        <Link href='/policy'><a className={style.links__item}>Политика Конфиденциальности</a></Link>
                        <Link href='/about-us'><a className={style.links__item}>О нас</a></Link>
                        <a href="mailto:irm.news@yandex.ua" className={style.links__item}>Техподдержка</a>
                    </div>
                    <p className={style.copyright}>
                        © 2021 IRM News. Все права защищены.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Footer;
