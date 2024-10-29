import Document, { Html, Head, Main, NextScript,DocumentContext } from "next/document";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext){
    return Document.getInitialProps(ctx);  
  }

  render() {
    return (
      <Html lang="en">
        <Head/>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  
}
