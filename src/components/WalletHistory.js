import React, { Link, Component, useState, useContext, useEffect } from 'react';
import '../App.css';
import { TextField, Grid, Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import { Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { auth, getTransactions } from '../firebase';
import { UserContext } from '../providers/UserProvider';

const WalletHistory = () => {
  const user = useContext(UserContext);
  //console.log(user);
  const [transactions, setTransactions] = useState(null);
  useEffect (() => {
      async function getData () {
        const t = await getTransactions(user);
        setTransactions(t);
        return t;
        //console.log(transactions);
      }
      getData();
    }, [1]);
  
  function createData(sender, receiver, amount, timestamp) {
    return { sender, receiver, amount, timestamp };
  }

  const rows = [];
  if (transactions !== null)
    transactions.forEach(function(t) {
      var d = new Date(t.timestamp.seconds);
      console.log(d);
      rows.push(createData(t.sender, t.receiver, t.amount, t.timestamp));
    });
  
  return (
    
    <div className="App">
        <h1>Wizarding Money</h1>
      <Grid container direction="column" alignItems="center">
        <h3>Welcome, {user.displayName}!</h3>    
        <h4>Wallet History</h4>
        <h4>Account Balance: {user.balance}</h4>
        {/*<Button
          variant="contained"
          onClick = { event => { console.log(rows[0]); }}
        >
        Wallet History</Button>*/}
          <TableContainer component={Paper}>
            <Table align="center" className="" style={{ marginLeft: '12.5%', width: '50%', position: 'absolute', float: 'center' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Sender</TableCell>
                  <TableCell>Receiver</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.sender}</TableCell>
                    <TableCell>{row.receiver}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{ (row.timestamp.toLocaleDateString('en-IN')) }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
        <br />
        <Button style={{ position: 'fixed', bottom: '15%'}} variant="contained" onClick = {() => {auth.signOut()}}>Sign out</Button>
      </Grid>
    </div>
  );
}

export default WalletHistory;
