import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap" rel="stylesheet"/>
            <script src="https://kit.fontawesome.com/YOURKIT.js" crossOrigin="anonymous"></script>
        </Head>  
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
