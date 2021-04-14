import { DefaultSeo } from 'next-seo'
import '../base'
import NavBar from '../components/NavBar/NavBar'
import firebase from "firebase/app"
import { useAuthState } from 'react-firebase-hooks/auth'
import DashboardNav from '../components/DashboardNav/DashboardNav'
import Footer from '../components/Footer/Footer.jsx'
import '../styles/globals.css'
import '../styles/RichText.scss'

function MyApp({ Component, pageProps }) {

  const auth = firebase.auth()
  const [user] = useAuthState(auth)

  return <>
    <DefaultSeo
      title='IRM News'
      openGraph={{
        type: 'website',
        locale: 'ru_RU',
        url: 'URL',
        site_name: 'IRMNews',
        description: 'Самые интересные новости мира ждут ваш на нашем сайте!'
      }}
    />
    {user ? <DashboardNav/> : <NavBar /> }
      <div className='content'>
        <Component {...pageProps} />
      </div>
      <Footer/>
  </>
}

export default MyApp
