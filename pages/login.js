import React, { useState } from 'react';
import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Alert, AlertTitle } from '@material-ui/lab';
import style from '../styles/login.module.scss'

const Login = () => {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const auth = firebase.auth()
    const [user] = useAuthState(auth)
    const [error, setError] = useState('');

    const changeHandler = (event) => {
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value })
    }



    const loginHandler = (event) => {
        const { email, password } = form
        auth.signInWithEmailAndPassword(email, password)
            .then(data => {
                router.push('/dashboard')
            })
            .catch(e => setError(e))
    }

    return (
        <>
            {error
                ? <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error.message}
                </Alert>
                : ''}
            {user
                ? <div>
                    <p>Вы уже вошли в систему</p>
                    <Link href='/dashboard'><a>Перейти в консоль</a></Link>
                </div>

                : <div className={style.wrapper}>
                    <div className={style.container}>

                        <h1 className={style.title}>
                            Авторизация
                        </h1>
                        <div>
                            <div className={style.input__block}>
                                <input type='text' name='email'  className={style.input} value={form.email} placeholder='Email' onChange={changeHandler} required />
                            </div>
                            <div className={style.input__block}>
                                <input type='password' name='password' className={style.input} value={form.password} placeholder='Пароль' onChange={changeHandler} required />
                            </div>
                            
                            <button type='submit' onClick={loginHandler} className={style.btn} >Войти</button>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default Login
