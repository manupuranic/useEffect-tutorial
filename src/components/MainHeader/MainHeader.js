import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

import AuthContext from "../../store/auth-context";

const MainHeader = () => {
  return (
    <header className={classes["main-header"]}>
      <h1>A Typical Page</h1>
      <Navigation onLogout={AuthContext.onLogout} />
    </header>
  );
};

export default MainHeader;
