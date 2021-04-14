import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import style from './dashboardNav.module.scss'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
import Link from 'next/link'
import { useRouter } from 'next/router'
import firebase from "firebase/app"

const DashboardNav = () => {
    const [panelOpen, setPanelOpen] = useState(false);
    const router = useRouter()
    const auth = firebase.auth()

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setPanelOpen(open);
    };

    const signOut = () => {
        auth.signOut()
        router.push('/')
    }

    const menuList = [
        { text: 'Написать новость', link: '/dashboard/create-post' },
    ]

    const pagesList = [
        { text: 'Все статьи', link: '/' },
        { text: 'IT', link: '/rubric/it' },
        { text: 'Мир', link: '/rubric/world' },
        { text: 'Россия', link: '/rubric/russia' }
    ]

    const dashboardList = [
        { text: 'Список всех новостей', link: '/dashboard' },
        { text: 'Список IT новостей', link: '/dashboard/it-news' },
        { text: 'Список мировых новостей', link: '/dashboard/world-news' },
        { text: 'Список новостей России', link: '/dashboard/russian-news' }
    ]

    const list = (anchor) => (
        <div
            className={style.list}
            role="presentation">
            <Typography className={style.nav_title} variant="h4" noWrap>
                Консоль
            </Typography>
            <List>
                {menuList.map((item, index) => (
                    <Link href={item.link} key={`${item.text}_${index}`}>
                        <ListItem button key={item.text}>
                            <a>
                                <ListItemText primary={item.text} />
                            </a>
                        </ListItem>
                    </Link>

                ))}
            </List>
            <Divider />
            
            
            <List>
                    <Typography className={style.nav_subtitle} variant="h6" noWrap>
                        Навигация по сайту
                    </Typography>
                {pagesList.map((item, index) => (
                    <Link href={item.link} key={`${item.text}_${index}`}>
                        <ListItem button key={item.text} disabled={router.pathname == item.link ? true : false}>
                            <a>
                                <ListItemText primary={item.text} />
                            </a>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                    <Typography className={style.nav_subtitle} variant="h6" noWrap>
                        Навигация по консоли
                    </Typography>
                {dashboardList.map((item, index) => (
                    <Link href={item.link} key={`${item.text}_${index}`}>
                        <ListItem button key={item.text} disabled={router.pathname == item.link ? true : false}>
                            <a>
                                <ListItemText primary={item.text} />
                            </a>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={signOut}>
                    <ListItemText primary='Выйти' />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={`${style.navigation} d-flex`}>
            <AppBar position="sticky" className={style.appBar}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer('left', !panelOpen)}
                        className={style.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={style.bar_title} variant="h5" noWrap>
                        Консоль администратора
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* <button onClick={toggleDrawer('left', true)}>Open Menu</button> */}
            <Drawer anchor={'left'} open={panelOpen} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </div>
    );
}

export default DashboardNav;
