import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { TextField, Grid, Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import { addData, auth, signInWithGoogle, generateUserDocument } from './firebase';

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  }
  return (
    <div className="App">
        <h1>Wizarding Money</h1>
      <Grid container direction="column" alignItems="center">
      <h3>Welcome!</h3>
      <h4>Wallet History</h4>
      <h4>Account Balance: </h4>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input name="email" id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Receiver's email.</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Amount</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" type="number" />
        </FormControl>
        <br/>
        <Button variant="contained"
          
            >Submit</Button>
        {/*<Button variant="contained"
          onClick={() => {
            try {
              signInWithGoogle();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}>
          Sign Up With Google
        </Button>*/}
      </Grid>
    </div>
  );
}

export default App;
