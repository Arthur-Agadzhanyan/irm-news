import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import IRMEditor from '../components/IRMEditor';
import { useHttp } from '../hooks/http.hook';
import style from '../styles/create-post-page.module.scss'
import IRMAlert from '../components/IRMAlert';

const irmidea = () => {
    const [form, setForm] = useState({
        rubric: '', name: '', title: '', description: '', text: ''
    });
    const [alertMessage, setAlert] = useState(<IRMAlert severity={'warning'} show={false}/>);
    const { request } = useHttp()

    const changeHandler = (event) => {
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const handleEditorChange = (e) => {
        setForm({ ...form, text: e.target.getContent() })
    }

    const sendPost = async () => {
        if (form.name.trim() && form.title.trim() && form.description.trim() && form.text.trim() && form.rubric.trim() && form.rubric !== "Выберите рубрику") {
            await request('/api/userPost/', "POST", { name: form.name, title: form.title, description: form.description, text: form.text, rubric: form.rubric })
                .then((data) => {
                    setAlert(<IRMAlert severity={'success'} text={data.message}/>)
                })
                .catch((e) => {
                    setAlert(<IRMAlert severity={'error'} text={e.message}/>)
                })
        }
        else {
            setAlert(<IRMAlert severity={'warning'} text={'Заполнены не все поля. Поле с кратким описанием не должно содержать более 200 символов'}/>)
        }
    }

    const inputs = [
        { name: 'name', palceholder: 'Ваш псевдоним', value: form.name },
        { name: 'title', palceholder: 'Заголовок', value: form.title },
        { name: 'description', palceholder: 'Краткое описание статьи', value: form.description },
    ]

    return (
        <div className='container'>
            <h1 className={style.pageTitle}>Подать идею для статьи</h1>

            <select className={style.rubric_select} value={form.rubric} name="rubric" onChange={changeHandler} required>
                <option>Выберите рубрику</option>
                <option>Россия</option>
                <option>Мир</option>
                <option>IT</option>
            </select>
            {alertMessage}

            {inputs.map((item, i) => (
                <input name={item.name} className={`${style.title_input} mb20`} placeholder={item.palceholder} key={`${item}_${i}`} onChange={changeHandler} value={item.value} required />
            ))}
            <IRMEditor handleEditorChange={handleEditorChange} />
            <Button variant='contained' color='inherit' type='submit' className={style.create_post_btn} onClick={sendPost}>Отправить</Button>

        </div>
    );
}

export default irmidea;
