import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { TextField, Grid, Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import { addData, auth, signInWithGoogle, generateUserDocument } from './firebase';
import { Router } from "@reach/router";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";
import TransferMoney from "./components/TransferMoney";
import WalletHistory from './components/WalletHistory';
import { UserContext } from "./providers/UserProvider";

function App() {

  return (
    <UserProvider>
      <Application />
      <footer style={{ position: "fixed", bottom: '5%', right: '5%' }}>
        Developed by 
        <a href="" style={{padding: '0 0.2rem' }}>Farnaz</a>
        <a href="" style={{padding: '0 0.2rem' }}>Kushal</a>
        <a href="" style={{padding: '0 0.2rem' }}>Anwita</a>
        <a href="" style={{padding: '0 0.2rem' }}>Arka</a>
      </footer>
    </UserProvider>
  );
}

export default App;
