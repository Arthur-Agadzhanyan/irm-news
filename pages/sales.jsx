import React from 'react';
import styles from '../styles/footer-pages.module.scss'

const Sales = () => {
    return (
        <div className={`${styles.sales} container`}>
            <h1 className={styles.page_title}>Реклама</h1>
            <div className={styles.contacts}>
                <div className={styles.contacts__block}>
                    <div className={styles.name}>Контакты: <span className={styles.phone}> +38 (080) 055 53 53</span></div>
                    <div className={styles.mail_block}>
                        <a href="mailto:irm.business@yandex.ru">irm.business@yandex.ru</a>
                    </div>
                </div>
                <div className={styles.contacts__block}>
                    <div className={styles.name}>Нижнёв Антон<span> &ndash; директор по рекламе</span></div>
                    <div className={styles.mail_block}>
                        <a href="mailto:nizhnev.anton@yandex.ua">nizhnev.anton@yandex.ua</a>
                    </div>
                </div>
                <div className={styles.contacts__block}>
                    <div className={styles.name}>Новиков Сергей<span> &ndash; заместитель директора по рекламе</span></div>
                    <div className={styles.mail_block}>
                        <a href="mailto:novikov.sergei@yandex.ua">novikov.sergei@yandex.ua</a>
                    </div>
                </div>
                <div className={styles.contacts__block}>
                    <div className={styles.name}>Галенков Дмитрий<span> &ndash; коммерческий менеджер</span></div>
                    <div className={styles.mail_block}>
                        <a href="mailto:galenkov.dmitry@yandex.ru">galenkov.dmitry@yandex.ru</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sales;
