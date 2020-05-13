import React from 'react';
import { useContext, useState } from 'react';
import '../App.css';
import { Grid, Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";

const Register = () => {
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
  };

  return (
    <div className="App">
        <h1>Wizarding Money</h1>
      <Grid container direction="column" alignItems="center">
        <h3>Sign Up</h3>
        <FormControl>
          <InputLabel htmlFor="displayName">Name</InputLabel>
          <Input 
            id="displayName"
            aria-describedby="displayNameHelper"
            name="displayName" 
            value = {displayName}
            onChange={event => onChangeHandler(event)}
          />
          <FormHelperText id="displayNameHelper">How do you want us to call you?</FormHelperText>
        </FormControl>
        
        <FormControl>
          <InputLabel htmlFor="userEmail">Email address</InputLabel>
          <Input 
            id="userEmail"
            aria-describedby="userEmailHelper"
            name="userEmail" 
            value = {email}
            onChange={event => onChangeHandler(event)}
            />
          <FormHelperText id="userEmailHelper">We'll never share your email.</FormHelperText>
        </FormControl>
        
        <FormControl>
          <InputLabel htmlFor="userPassword">Password</InputLabel>
          <Input
            id="userPassword"
            aria-describedby="userPasswordHelper"
            name="userPassword"
            value = {password}
            type="password" 
            onChange={event => onChangeHandler(event)}
          />
        </FormControl>

        <br/>
        
        <Button
          variant="contained"
          onClick={event => {
            createUserWithEmailAndPasswordHandler(event, email, password);
          }}
        >
          Submit
        </Button>
        {/*<Button variant="contained" onClick={() => {
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
};

export default Register;
