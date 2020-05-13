import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import Register from "./Register";
import UserProvider from "../providers/UserProvider";
import TransferMoney from "./TransferMoney";
import { UserContext } from "../providers/UserProvider";
//import PasswordReset from "./PasswordReset";

const Application = () => {
    const user = useContext(UserContext);
    //const user = 0;
    return (
        user ?
        <TransferMoney />
        :
        <Router>
          <Register path="register" />
          <SignIn path="/" />
        </Router>
    );
}

export default Application;
