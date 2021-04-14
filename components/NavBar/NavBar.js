import React, { useState } from 'react';
import style from './style.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router';


const NavBar = (props) => {
    const [show, setShow] = useState(false);
    function showMenu() {
        setShow(!show)
    }

    const router = useRouter()
    const navLinks = [
        { link: '/', text: 'Все потоки' },
        { link: '/rubric/it', text: 'IT' },
        { link: '/rubric/world', text: 'Мировые новости' },
        { link: '/rubric/russia', text: 'Россия' }
    ]

    return (
        <nav className={style.header}>
            <div className={style.container}>
                <nav className={style.navbar}>
                    <div className={style.navbar__brand}>
                        <Link href={'/'}>
                            <a>
                                IRM News
                            </a>
                        </Link>
                </div>
                    <div className={style.navbar__navigation}>
                        <ul id={style.menu} className={`${style.menu} ${show ? style.active : ""}`}>
                            <span id={style.close_menu} className={style.close_menu} onClick={showMenu}>×</span>
                            {navLinks.map((item, i) => {
                                return (
                                    <Link key={`${item}_${i}`} href={item.link}>
                                        <a className={router.pathname == item.link ? style.active_page : ''} onClick={showMenu}>
                                            <li className={`${style.menu__item} ${style.active}  ${router.pathname == item.link ? style.active_page : ''}`}>
                                                {item.text}
                                            </li>
                                        </a>
                                    </Link>
                                )
                            })}

                        </ul>
                        <div id={style.bar} className={style.bar} onClick={showMenu}><i className="fas fa-bars" aria-hidden></i></div>
                    </div>
                </nav>
            </div>
        </nav>
    );
}

export default NavBar;
