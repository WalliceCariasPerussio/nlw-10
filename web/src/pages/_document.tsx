import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render(){
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet"/>
        </Head>
        <body className="bg-gray-900 bg-app bg-no-repeat bg-cover" >
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}