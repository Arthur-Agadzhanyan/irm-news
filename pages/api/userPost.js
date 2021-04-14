// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const nodemailer = require("nodemailer");

export default async (req, res) => {
    try {
        if (req.method === 'POST') {

            const { name, title, description, text, rubric } = req.body
            res.statusCode = 200

            let transporter = nodemailer.createTransport({
                host: 'smtp.mail.ru',
                port: 465 ,
                secure: true,
                auth: {
                    user: 'irm.users@bk.ru',
                    pass: 'agarkamkataard',
                },
            })

            let mailOption = {
                from: '<irm.users@bk.ru>',
                to: 'irm.users@bk.ru',
                subject: `Новость от пользователя: ${name}`,
                text: `Ник: ${name} \n\n Заголовок: ${title} \n\n Описание: ${description} \n\n Текст: ${text} \n\n Рубрика: ${rubric} \n `,
                html: `Ник: ${name} <hr> Заголовок: ${title} <hr> Описание: ${description} <hr> Текст: ${text} <hr> Рубрика: ${rubric} <hr> `
            }

            let info = await transporter.sendMail(mailOption)
            res.json({ message: 'Ваша статья была успешно доставлена на рассмотрение' })
        }
    } catch (e) {
        res.statusCode = 500
        res.json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
}
