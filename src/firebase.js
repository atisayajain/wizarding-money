import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyADz_-Xw-Dzq997eD80J8Ilk_vNK-6WnMg",
    authDomain: "wizarding-money.firebaseapp.com",
    databaseURL: "https://wizarding-money.firebaseio.com",
    projectId: "wizarding-money",
    storageBucket: "wizarding-money.appspot.com",
    messagingSenderId: "104041549527",
    appId: "1:104041549527:web:c9ea151d5eadcbd74b2a92"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const createTransaction = (sender, receiver, amount) => {
    const userRef = firestore.collection('transactions').add({
        sender: sender,
        receiver: receiver,
        amount: amount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });    
}

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        balance: 250,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const transferMoney = async (user, receiver, amount) => {
    if(!user) return;
    var receiverRef;
    console.log(user, receiver, amount);
    firestore.collection('users').where('email', '==', receiver)
    .get().then(
        function(querySnapshot) {
            querySnapshot.forEach(function(receiverDoc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(receiverDoc.id, " => ", receiverDoc.data());
                firestore.collection('users').doc(user.uid).update({
                    balance: (user.balance - amount)
                })
                .then(function() {
                    console.log("User document updated successfully!");
                })
                .catch(function(error) {
                    console.error("Error updating user document: ", error);
                });

                firestore.collection('users').doc(receiverDoc.id).update({
                    balance: (receiverDoc.data().balance + amount)
                })
                .then(function() {
                    console.log("Receiver document updated successfully!");
                })
                .catch(function(error) {
                    console.error("Error updating receiver document: ", error);
                });
            });
            createTransaction(user.email, receiver, amount);
        }).catch(function(error) {
            console.log("Error getting document:", error);
    });
    {/*const userRef = firestore.collection('users').where("email" == user.email ).set({
        balance: (user.balance - amount)
    })
    .then(function() {
        console.log("User document updated successfully!");
    })
    .catch(function(error) {
        console.error("Error updating user document: ", error);
    });
    const userRef = firestore.collection('users').where("email" == user.email ).set({
        balance: (user.balance - amount)
    })
    .then(function() {
        console.log("User document updated successfully!");
    })
    .catch(function(error) {
        console.error("Error updating user document: ", error);
    });*/}

    return receiver;
};

export const getTransactions = async (user) => {
    var transactions = [];
    const transactionsRef = firestore.collection('transactions');
    const sent = await transactionsRef.where('sender', '==', user.email).get().then(
        function(querySnapshot) {
            var transaction = [];
            querySnapshot.forEach(function(receiverDoc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(receiverDoc.id, " => ", receiverDoc.data());
                var ts = receiverDoc.data().timestamp.toDate();
                //console.log(ts);
                var  data = receiverDoc.data();
                data.timestamp = ts;
                transaction.push(data);
            });
            return transaction;
        }
        );
    console.log(sent);
    const received = await transactionsRef.where('receiver', '==', user.email).get().then(
        function(querySnapshot) {
            var transaction = [];
            querySnapshot.forEach(function(receiverDoc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(receiverDoc.id, " => ", receiverDoc.data().timestamp);
                var ts = receiverDoc.data().timestamp.toDate();
                //console.log(ts);
                var  data = receiverDoc.data();
                data.timestamp = ts;
                transaction.push(data);
            });
            return transaction;
        }
    );
    console.log(received);
    sent.forEach(function(s) {
        transactions.push(s);
    });
    received.forEach(function(r) {
        transactions.push(r);
    });
    //push(sent);
    //transactions.push(received);
    console.log(transactions);
    return transactions;

    {/*const [
        sentSnapshot,
        receivedSnapshot
    ] = await Promise.all([sent, received]);

    const sentArray = sentSnapshot.docs;
    const receivedArray = receivedSnapshot.docs;
    console.log(sentArray);
    console.log(receivedArray);

    //Note that we don't need to de-duplicate in this case
    return (sentArray, receivedArray);*/}
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
