import Document, { Html, Head, Main, NextScript } from "next/document";
import MainNav from "@components/nav/MainNav";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <MainNav />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
