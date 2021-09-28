import React from "react";
import { Header } from "../Header";

/**
 * @author
 * @function Layout
 **/

export const Layout = (props) => {
  console.log("====> props. ", props);
  return (
    <React.Fragment>
      {props.header && <Header />}

      {props.children}
    </React.Fragment>
  );
};
