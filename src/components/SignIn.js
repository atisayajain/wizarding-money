import React from 'react';
import { useContext, useState } from 'react';
import { Link } from '@reach/router';
import '../App.css';
import { Grid, Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import { auth, signInWithGoogle, generateUserDocument } from '../firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event,email, password) => {
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
      });
    };
    
    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
      
        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
    };
      
  return (
    <div className="App">
        <h1>Wizarding Money</h1>
      <Grid container direction="column" alignItems="center">
        <h3>Sign In</h3>
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
          onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
          >
          Submit
        </Button>
        <br/>
        <p>Not a user? <Link to="register">Register</Link></p>
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
}

export default SignIn;
