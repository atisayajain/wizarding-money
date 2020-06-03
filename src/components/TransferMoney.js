import React from 'react';
import { useContext, useState } from 'react';
import '../App.css';
import { TextField, Grid, Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import { addData, auth, signInWithGoogle, generateUserDocument, transferMoney, createTransaction } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { Link } from '@reach/router';

const TransferMoney = () => {
  const user = useContext(UserContext);
  console.log(user);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "receiverEmail") {
      setReceiverEmail(value);
    } else if (name === "amount") {
      setAmount(value);
    }
  }

  return (
    <div className="App">
        <h1>Wizarding Money</h1>
      <Grid container direction="column" alignItems="center">
      <h3>Welcome, {user.displayName}!</h3>
      
      <h4>Transfer Money</h4>
      <h4>Account Balance: {user.balance}</h4>

      <FormControl>
        <InputLabel htmlFor="receiverEmail">Receiver's Email</InputLabel>
        <Input 
          id="receiverEmail"
          aria-describedby="receiverEmailHelper"
          name="receiverEmail" 
          value = {receiverEmail}
          onChange={event => onChangeHandler(event)}
          />
        <FormHelperText id="receiverEmailHelper">To whom you want to transfer money.</FormHelperText>
      </FormControl>
      
      <FormControl>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <Input
          id="amount"
          aria-describedby="amountHelper"
          name="amount"
          value = {amount}
          type="number" 
          onChange={event => onChangeHandler(event)}
        />
      </FormControl>
        <br/>
        <Button variant="contained"
          onClick = { event => {transferMoney(user, receiverEmail, parseInt(amount))}}
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
        <br />
        <Link style={{ textDecoration: 'none' }} to="wallethistory"><Button variant="contained">Wallet History</Button></Link>
        <br />
        <Button variant="contained" onClick = {() => {auth.signOut()}}>Sign out</Button>
      </Grid>
    </div>
  );
}

export default TransferMoney;
