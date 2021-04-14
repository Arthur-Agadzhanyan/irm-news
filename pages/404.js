import { Button } from "@material-ui/core";
import Link from "next/link";
import styles from '../styles/error_page.module.scss'

export default function Custom404() {
    return <div className={styles.error}>
        <h1 className={styles.error__title}>404</h1>
        <h2 className={styles.error__subtitle}>Страница не найдена</h2>
        <Link href='/'>
            <Button variant='contained' color='inherit' className='light_btn'>
                <a className={styles.homepage_link}>На главную</a>
            </Button>
        </Link>
    </div>
}
