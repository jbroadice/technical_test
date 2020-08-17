import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import MainNav from "@components/nav/MainNav";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <MainNav />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
