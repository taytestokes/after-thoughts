import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/after-thoughts-logo.png" />
        </Head>
        <body className="text-white bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
